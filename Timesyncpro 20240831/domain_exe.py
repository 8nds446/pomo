import os
import logging
import argparse
from tqdm import tqdm
import concurrent.futures
import importlib
import traceback
import asyncio
import logging.handlers
import sys
import anthropic
import json

from config.settings import BABEL_GENERATED_DIR
from utils.utils import normal
from concurrent.futures import ThreadPoolExecutor
from utils.utils import generate_response_with_cache, generate_response


def setup_logging():
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)
    
    file_handler = logging.handlers.RotatingFileHandler(
        'domain_exe.log', maxBytes=10*1024*1024, backupCount=5)
    file_handler.setLevel(logging.DEBUG)
    
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)
    
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    
    return logger

logger = setup_logging()

def import_modules(template_saas, system_name):
    logger.info(f"モジュールのインポートを開始: template_saas={template_saas}, system_name={system_name}")
    concept = importlib.import_module(f"{template_saas}.def_concept").concept
    dir_frontend = importlib.import_module(f"{template_saas}.def_concept").dir_structure
    files = importlib.import_module(f"{template_saas}.def_domain").files
    constraints = importlib.import_module(f"{template_saas}.def_constraints").constraints

    root_dir = os.path.expanduser(f"{BABEL_GENERATED_DIR}/{system_name}/temp")
    logger.debug(f"ルートディレクトリ: {root_dir}")
    logger.info("モジュールのインポートが完了しました")
    return concept, dir_frontend, files, root_dir, constraints

async def create_file(directory, filename, prompt, file_number, concept, dir_frontend, constraints, root_dir, progress_bar, total_files, max_tokens, temperature, client):
    logger.debug(f"ファイル作成開始: {filename}")
    file_path = os.path.join(root_dir, directory)
    os.makedirs(file_path, exist_ok=True)
    file_path = os.path.join(file_path, filename)
    logger.debug(f"ファイルパス: {file_path}")
    
    with open(file_path, "w", encoding="utf-8") as f:
        model = "claude-3-5-sonnet-20240620"
        system_content = f"{concept}\n{dir_frontend}\n{constraints}"
        response = generate_response_with_cache(client, model, f"上記の内容をもとにして{prompt}", max_tokens, temperature, system_content)
        # response = generate_response(model, f"上記の内容をもとにして{prompt}", max_tokens, temperature)
        formatted_response = normal(response)
        f.write(formatted_response)
    
    progress_bar.update(1)
    logger.debug(f"ファイル作成完了: {filename}")

async def main(template_saas, system_name, next_app_name, max_tokens, temperature):
    print("ANTHROPIC_API_KEYの確認を開始します")
    if "ANTHROPIC_API_KEY" not in os.environ:
        print("警告: ANTHROPIC_API_KEYが環境変数に設定されていません")
        api_key = input("ANTHROPIC_API_KEYを入力してください (https://console.anthropic.com/settings/keys): ")
        os.environ["ANTHROPIC_API_KEY"] = api_key
        print(f"ANTHROPIC_API_KEYを環境変数に設定しました: {api_key[:5]}...")
    else:
        print(f"ANTHROPIC_API_KEYが環境変数に設定されています: {os.environ['ANTHROPIC_API_KEY'][:5]}...")

    print(f"メイン処理開始: template_saas={template_saas}, system_name={system_name}, next_app_name={next_app_name}")
    concept, dir_frontend, files, root_dir, constraints = import_modules(template_saas, system_name)
    print(f"インポートされたモジュール情報: concept={concept[:50]}..., dir_frontend={dir_frontend[:50]}..., files数={len(files)}, root_dir={root_dir}, constraints={constraints[:50]}...")
    
    root_dir = root_dir.replace("{next-app-name}", next_app_name)
    if not os.path.exists(root_dir):
        os.makedirs(root_dir)
        print(f"ルートディレクトリを作成しました: {root_dir}")
    else:
        print(f"ルートディレクトリが既に存在します: {root_dir}")

    # package.jsonの作成
    package_json_path = os.path.join(root_dir, 'package.json')
    package_json_content = {
        "name": "my-app0",
        "version": "0.1.0",
        "private": True,
        "scripts": {
            "dev": "next dev",
            "build": "next build",
            "start": "next start",
            "lint": "next lint"
        },
        "dependencies": {
            "react": "^18",
            "react-dom": "^18",
            "next": "14.2.5"
        },
        "devDependencies": {
            "typescript": "^5",
            "@types/node": "^20",
            "@types/react": "^18",
            "@types/react-dom": "^18",
            "postcss": "^8",
            "tailwindcss": "^3.4.1",
            "eslint": "^8",
            "eslint-config-next": "14.2.5",
            "lucide-react": "^0.358.0"
        }
    }
    with open(package_json_path, 'w') as f:
        json.dump(package_json_content, f, indent=2)
    logger.info(f"package.jsonを作成しました: {package_json_path}")

    progress_bar = tqdm(total=len(files), unit="files")
    print(f"合計ファイル数: {len(files)}")

    client = anthropic.Anthropic()

    async def process_file(file_info):
        directory, filename, prompt = file_info
        logger.debug(f"プロセス開始: {filename}")
        await create_file(directory, filename, prompt, files.index(file_info) + 1, concept, dir_frontend, constraints, root_dir, progress_bar, len(files), max_tokens, temperature, client)
        logger.debug(f"プロセス完了: {filename}")

    logger.info(f"並列処理開始: 合計 {len(files)} ファイル")
    
    # ThreadPoolExecutorを使用して並列処理を実現
    with ThreadPoolExecutor(max_workers=10) as executor:
        loop = asyncio.get_event_loop()
        tasks = [loop.run_in_executor(executor, asyncio.run, process_file(file_info)) for file_info in files]
        await asyncio.gather(*tasks)

    logger.info("すべてのファイル生成が完了しました")
    progress_bar.close()
    print("すべてのファイル生成が完了しました")

if __name__ == "__main__":
    try:
        parser = argparse.ArgumentParser(description="SaaSアプリケーション生成スクリプト")
        parser.add_argument("-t", "--template_saas", required=True, help="テンプレートSaaS名を指定してください")
        parser.add_argument("-s", "--system_name", required=True, help="システム名を指定してください")
        parser.add_argument("-na", "--next_app_name", required=True, help="Next.jsアプリケーション名を指定してください")
        parser.add_argument("-mt", "--max_tokens", type=int, default=4096, help="生成する最大トークン数")
        parser.add_argument("-temp", "--temperature", type=float, default=0.2, help="生成の温度パラメータ")
        args = parser.parse_args()
        
        logging.basicConfig(level=logging.DEBUG)
        logger.info("スクリプト実行開始")
        asyncio.run(main(args.template_saas, args.system_name, args.next_app_name, args.max_tokens, args.temperature))
        logger.info("スクリプト実行終了")
    except Exception as e:
        logger.error(f"スクリプト実行中にエラーが発生しました: {str(e)}")
        logger.error(traceback.format_exc())
        sys.exit(1)