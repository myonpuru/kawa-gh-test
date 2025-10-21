'use client'

import { useState, useEffect } from 'react'

type Priority = 'high' | 'medium' | 'low'
type FilterType = 'all' | 'completed' | 'pending'

interface Task {
  id: string
  title: string
  priority: Priority
  completed: boolean
  createdAt: string
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [filter, setFilter] = useState<FilterType>('all')

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }, [])

  // Save tasks to localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = () => {
    if (newTask.trim() === '') return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    }

    setTasks([...tasks, task])
    setNewTask('')
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const completionRate = tasks.length > 0
    ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
    : 0

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 border-red-500 text-red-600'
      case 'medium': return 'bg-yellow-500/10 border-yellow-500 text-yellow-600'
      case 'low': return 'bg-green-500/10 border-green-500 text-green-600'
    }
  }

  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case 'high': return '高'
      case 'medium': return '中'
      case 'low': return '低'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            タスク管理
          </h1>
          <p className="text-gray-600 text-lg">効率的にタスクを整理しましょう</p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{tasks.length}</div>
              <div className="text-sm text-gray-500 mt-1">総タスク</div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="text-3xl font-bold text-green-600">{tasks.filter(t => t.completed).length}</div>
              <div className="text-sm text-gray-500 mt-1">完了</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{completionRate}%</div>
              <div className="text-sm text-gray-500 mt-1">達成率</div>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Add Task Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">新しいタスクを追加</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="タスクを入力してください..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <div className="flex gap-3">
              <div className="flex gap-2 flex-1">
                {(['high', 'medium', 'low'] as Priority[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      priority === p
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {getPriorityLabel(p)}
                  </button>
                ))}
              </div>
              <button
                onClick={addTask}
                className="px-8 py-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all"
              >
                追加
              </button>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          {(['all', 'completed', 'pending'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                filter === f
                  ? 'bg-white text-purple-600 shadow-lg border-2 border-purple-600'
                  : 'bg-white/60 text-gray-600 hover:bg-white border-2 border-transparent'
              }`}
            >
              {f === 'all' ? 'すべて' : f === 'completed' ? '完了' : '未完了'}
            </button>
          ))}
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="bg-white/60 rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">タスクがありません</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      task.completed
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-transparent'
                        : 'border-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {task.completed && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
                        優先度: {getPriorityLabel(task.priority)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(task.createdAt).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
