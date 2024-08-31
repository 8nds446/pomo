'use client'

import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Plus, Edit2, Trash2, CheckCircle, Circle } from 'lucide-react'

type Task = {
  id: string
  title: string
  priority: number
  deadline: string
  progress: number
  completed: boolean
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState<string>('')
  const [editingTask, setEditingTask] = useState<string | null>(null)

  useEffect(() => {
    // ここでタスクをバックエンドから取得する処理を実装
    // 例: fetchTasks().then(setTasks)
  }, [])

  const addTask = () => {
    if (newTask.trim() === '') return
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      priority: tasks.length,
      deadline: new Date().toISOString().split('T')[0],
      progress: 0,
      completed: false,
    }
    setTasks([...tasks, task])
    setNewTask('')
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newTasks = Array.from(tasks)
    const [reorderedItem] = newTasks.splice(result.source.index, 1)
    newTasks.splice(result.destination.index, 0, reorderedItem)

    setTasks(newTasks.map((task, index) => ({ ...task, priority: index })))
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">タスクリスト</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow p-2 border rounded-l"
          placeholder="新しいタスクを入力"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          <Plus size={24} />
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-4 mb-2 rounded shadow flex items-center"
                    >
                      <button
                        onClick={() => updateTask(task.id, { completed: !task.completed })}
                        className="mr-2"
                      >
                        {task.completed ? (
                          <CheckCircle className="text-green-500" />
                        ) : (
                          <Circle className="text-gray-300" />
                        )}
                      </button>
                      {editingTask === task.id ? (
                        <input
                          type="text"
                          value={task.title}
                          onChange={(e) => updateTask(task.id, { title: e.target.value })}
                          onBlur={() => setEditingTask(null)}
                          className="flex-grow mr-2"
                          autoFocus
                        />
                      ) : (
                        <span className={`flex-grow mr-2 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </span>
                      )}
                      <span className="text-sm text-gray-500 mr-2">
                        期限: {task.deadline}
                      </span>
                      <div className="flex items-center">
                        <button
                          onClick={() => setEditingTask(task.id)}
                          className="text-blue-500 mr-2"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default TaskList