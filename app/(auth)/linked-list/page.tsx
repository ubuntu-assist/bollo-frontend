'use client'

import React, { useState, useCallback, useRef } from 'react'
import { Undo2, Redo2, Trash2, Circle, Square, Triangle } from 'lucide-react'

// Linked List Node for storing drawing actions
class ActionNode<T> {
  data: T
  next: ActionNode<T> | null = null
  prev: ActionNode<T> | null = null

  constructor(data: T) {
    this.data = data
  }
}

// Optimized Linked List for Undo/Redo operations
class UndoRedoList<T> {
  private head: ActionNode<T> | null = null
  private current: ActionNode<T> | null = null
  private size = 0
  private maxSize: number

  constructor(maxSize = 50) {
    this.maxSize = maxSize
  }

  // Add new action - O(1) time complexity
  addAction(action: T): void {
    const newNode = new ActionNode(action)

    if (this.current) {
      // Remove all nodes after current (clear redo history)
      this.clearRedoHistory()

      // Link new node
      newNode.prev = this.current
      this.current.next = newNode
      this.current = newNode
    } else {
      // First action
      this.head = newNode
      this.current = newNode
    }

    this.size++
    this.enforceMaxSize()
  }

  // Undo operation - O(1) time complexity
  undo(): T | null {
    if (!this.current) return null

    const action = this.current.data
    this.current = this.current.prev
    return action
  }

  // Redo operation - O(1) time complexity
  redo(): T | null {
    if (!this.current) {
      // At the beginning, move to head
      if (this.head) {
        this.current = this.head
        return this.current.data
      }
      return null
    }

    if (this.current.next) {
      this.current = this.current.next
      return this.current.data
    }

    return null
  }

  canUndo(): boolean {
    return this.current !== null
  }

  canRedo(): boolean {
    return (
      this.current?.next !== null ||
      (this.current === null && this.head !== null)
    )
  }

  private clearRedoHistory(): void {
    if (!this.current?.next) return

    let node: ActionNode<T> | null = this.current.next
    while (node) {
      const next: ActionNode<T> | null = node.next
      node.prev = null
      node.next = null
      this.size--
      node = next
    }
    this.current.next = null
  }

  private enforceMaxSize(): void {
    while (this.size > this.maxSize && this.head) {
      const oldHead = this.head
      this.head = this.head.next
      if (this.head) {
        this.head.prev = null
      }
      oldHead.next = null
      this.size--
    }
  }

  clear(): void {
    this.head = null
    this.current = null
    this.size = 0
  }

  getSize(): number {
    return this.size
  }
}

// Drawing action types
interface DrawingAction {
  type: 'ADD' | 'REMOVE'
  shape: Shape
  id: string
}

interface Shape {
  id: string
  type: 'circle' | 'square' | 'triangle'
  x: number
  y: number
  color: string
  size: number
}

const COLORS = [
  '#ef4444',
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#ec4899',
]

const DrawingApp: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [selectedTool, setSelectedTool] = useState<
    'circle' | 'square' | 'triangle'
  >('circle')
  const [actionHistory] = useState(() => new UndoRedoList<DrawingAction>(50))
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [stats, setStats] = useState({ operations: 0, historySize: 0 })

  // Update undo/redo button states
  const updateHistoryState = useCallback(() => {
    setCanUndo(actionHistory.canUndo())
    setCanRedo(actionHistory.canRedo())
    setStats((prev) => ({ ...prev, historySize: actionHistory.getSize() }))
  }, [actionHistory])

  // Add a new shape
  const addShape = useCallback(
    (x: number, y: number) => {
      const newShape: Shape = {
        id: Date.now().toString() + Math.random(),
        type: selectedTool,
        x: x - 25,
        y: y - 25,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 50,
      }

      const action: DrawingAction = {
        type: 'ADD',
        shape: newShape,
        id: newShape.id,
      }

      setShapes((prev) => [...prev, newShape])
      actionHistory.addAction(action)

      setStats((prev) => ({
        operations: prev.operations + 1,
        historySize: actionHistory.getSize(),
      }))
      updateHistoryState()
    },
    [selectedTool, actionHistory, updateHistoryState]
  )

  // Handle canvas click
  const handleCanvasClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        addShape(x, y)
      }
    },
    [addShape]
  )

  // Undo operation - O(1) with linked list vs O(n) with array
  const handleUndo = useCallback(() => {
    const action = actionHistory.undo()
    if (action) {
      if (action.type === 'ADD') {
        setShapes((prev) => prev.filter((shape) => shape.id !== action.id))
      } else if (action.type === 'REMOVE') {
        setShapes((prev) => [...prev, action.shape])
      }
      updateHistoryState()
    }
  }, [actionHistory, updateHistoryState])

  // Redo operation - O(1) with linked list vs O(n) with array
  const handleRedo = useCallback(() => {
    const action = actionHistory.redo()
    if (action) {
      if (action.type === 'ADD') {
        setShapes((prev) => [...prev, action.shape])
      } else if (action.type === 'REMOVE') {
        setShapes((prev) => prev.filter((shape) => shape.id !== action.id))
      }
      updateHistoryState()
    }
  }, [actionHistory, updateHistoryState])

  // Clear all shapes
  const handleClear = useCallback(() => {
    setShapes([])
    actionHistory.clear()
    setStats({ operations: 0, historySize: 0 })
    updateHistoryState()
  }, [actionHistory, updateHistoryState])

  // Remove shape on click
  const handleShapeClick = useCallback(
    (e: React.MouseEvent, shape: Shape) => {
      e.stopPropagation()

      const action: DrawingAction = {
        type: 'REMOVE',
        shape,
        id: shape.id,
      }

      setShapes((prev) => prev.filter((s) => s.id !== shape.id))
      actionHistory.addAction(action)

      setStats((prev) => ({
        operations: prev.operations + 1,
        historySize: actionHistory.getSize(),
      }))
      updateHistoryState()
    },
    [actionHistory, updateHistoryState]
  )

  const getShapeComponent = (shape: Shape) => {
    const baseClasses =
      'absolute cursor-pointer hover:opacity-75 transition-opacity'
    const style = {
      left: shape.x,
      top: shape.y,
      width: shape.size,
      height: shape.size,
      backgroundColor: shape.color,
    }

    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} rounded-full`}
            style={style}
            onClick={(e) => handleShapeClick(e, shape)}
          />
        )
      case 'square':
        return (
          <div
            key={shape.id}
            className={baseClasses}
            style={style}
            onClick={(e) => handleShapeClick(e, shape)}
          />
        )
      case 'triangle':
        return (
          <div
            key={shape.id}
            className={`${baseClasses} triangle`}
            style={{
              left: shape.x,
              top: shape.y,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
            onClick={(e) => handleShapeClick(e, shape)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='w-full h-screen bg-gray-100 flex flex-col'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b p-4'>
        <div className='flex items-center justify-between max-w-6xl mx-auto'>
          <h1 className='text-2xl font-bold text-gray-800'>
            Linked List Optimization Demo
          </h1>

          {/* Performance Stats */}
          <div className='flex items-center space-x-4 text-sm text-gray-600'>
            <span>Operations: {stats.operations}</span>
            <span>History Size: {stats.historySize}</span>
            <span className='text-green-600 font-medium'>O(1) Undo/Redo</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className='bg-white border-b p-4'>
        <div className='flex items-center justify-between max-w-6xl mx-auto'>
          <div className='flex items-center space-x-4'>
            {/* Tool Selection */}
            <div className='flex space-x-2'>
              <button
                onClick={() => setSelectedTool('circle')}
                className={`p-2 rounded-lg border-2 transition-colors ${
                  selectedTool === 'circle'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Circle size={20} />
              </button>
              <button
                onClick={() => setSelectedTool('square')}
                className={`p-2 rounded-lg border-2 transition-colors ${
                  selectedTool === 'square'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Square size={20} />
              </button>
              <button
                onClick={() => setSelectedTool('triangle')}
                className={`p-2 rounded-lg border-2 transition-colors ${
                  selectedTool === 'triangle'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Triangle size={20} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex items-center space-x-2'>
            <button
              onClick={handleUndo}
              disabled={!canUndo}
              className={`p-2 rounded-lg border transition-colors ${
                canUndo
                  ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              title='Undo (O(1) operation)'
            >
              <Undo2 size={20} />
            </button>
            <button
              onClick={handleRedo}
              disabled={!canRedo}
              className={`p-2 rounded-lg border transition-colors ${
                canRedo
                  ? 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              title='Redo (O(1) operation)'
            >
              <Redo2 size={20} />
            </button>
            <button
              onClick={handleClear}
              className='p-2 rounded-lg border border-red-300 text-red-600 hover:border-red-400 hover:bg-red-50 transition-colors'
              title='Clear all'
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className='bg-blue-50 border-b p-3'>
        <div className='max-w-6xl mx-auto'>
          <p className='text-blue-800 text-sm'>
            <strong>Click</strong> on the canvas to add shapes •{' '}
            <strong>Click</strong> on shapes to remove them • Use{' '}
            <strong>Undo/Redo</strong> buttons to see O(1) linked list
            optimization in action
          </p>
        </div>
      </div>

      {/* Canvas */}
      <div className='flex-1 overflow-hidden'>
        <div
          ref={canvasRef}
          className='w-full h-full relative cursor-crosshair bg-white'
          onClick={handleCanvasClick}
        >
          {shapes.map((shape) => getShapeComponent(shape))}

          {shapes.length === 0 && (
            <div className='absolute inset-0 flex items-center justify-center text-gray-400'>
              <div className='text-center'>
                <div className='text-6xl mb-4'>🎨</div>
                <div className='text-lg'>Click anywhere to start drawing</div>
                <div className='text-sm mt-2'>
                  Select a tool above and click to add shapes
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Performance Info */}
      <div className='bg-gray-50 border-t p-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
            <div className='bg-white p-3 rounded-lg border'>
              <h3 className='font-semibold text-gray-700 mb-1'>
                Linked List Benefits
              </h3>
              <p className='text-gray-600'>
                O(1) insertion/deletion at any position
              </p>
            </div>
            <div className='bg-white p-3 rounded-lg border'>
              <h3 className='font-semibold text-gray-700 mb-1'>
                vs Array Implementation
              </h3>
              <p className='text-gray-600'>
                Arrays would require O(n) for middle operations
              </p>
            </div>
            <div className='bg-white p-3 rounded-lg border'>
              <h3 className='font-semibold text-gray-700 mb-1'>
                Memory Efficiency
              </h3>
              <p className='text-gray-600'>
                Only stores action diffs, not full state copies
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawingApp
