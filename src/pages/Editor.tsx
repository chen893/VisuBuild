import React, { useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { type RootState } from '../store/types'
import {
  changeComponentFocus,
  updateComponentPosition,
  handleMouseDownOnCom,
  resetPositionAndLines,
  addComponentInList,
  deleteFocusedComponents,
  redo,
  undo,
  pasteComponents,
  copyComponents
} from '../store/editor'
import { components, componentsMap } from '../components/AvailableComponents'

const Editor: React.FC = () => {
  const componentList = useSelector((state: RootState) => state.editor.componentList)
  const linePosition = useSelector((state: RootState) => state.editor.linePosition)
  const dispatch = useDispatch()
  const containerRef = useRef<HTMLDivElement>(null)
  const currentComponent = useRef<string>('')
  const startPosition = useSelector((state: RootState) => state.editor.startPosition)

  const startListStyle = useSelector((state: RootState) => state.editor.startListStyle)

  const onDragStart = useCallback(
    (e: React.DragEvent, componentName: string) => {
      currentComponent.current = componentName
      e.dataTransfer.effectAllowed = 'move'
    },
    []
  )

  const handleMouseDownOnComponent = useCallback((e: MouseEvent, index: number) => {
    e.stopPropagation()
    if (e.button !== 0) return

    const clientX = e.clientX
    const clientY = e.clientY

    dispatch(handleMouseDownOnCom({ clientX, clientY, index }))
    dispatch(changeComponentFocus({ index, isShiftKey: e.shiftKey }))
  }, [])

  // 获取当前鼠标位于拖拽元素的相对位置。
  let offsetX = 0
  let offsetY = 0

  const handleMouseDownOnContainer = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return

      dispatch(changeComponentFocus({ reset: true }))
    },
    [componentList, startPosition, startListStyle]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!startPosition.isMove) return
      const isMove = componentList.some((item) => item.focus === true)

      if (isMove) {
        const { clientX, clientY } = e
        dispatch(
          updateComponentPosition({
            clientX,
            clientY
          })
        )
      }
    },
    [componentList, startPosition, startListStyle]
  )

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    dispatch(resetPositionAndLines(null))
  }, [])
  const deleteFocused = (): void => {
    dispatch(deleteFocusedComponents())
  }

  const copySelected = (): void => {
    dispatch(copyComponents())
  }

  const pasteCopied = (): void => {
    dispatch(pasteComponents())
  }

  const undoAction = (): void => {
    dispatch(undo())
  }

  const redoAction = (): void => {
    dispatch(redo())
  }
  const keyHandlers: Record<string, () => void> = {
    Delete: deleteFocused,
    'Ctrl+c': copySelected,
    'Ctrl+v': pasteCopied,
    'Ctrl+z': undoAction,
    'Ctrl+Shift+z': redoAction
  }
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const keyCombination = `${e.ctrlKey ? 'Ctrl+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.key}`

      const handler = keyHandlers[keyCombination]
      if (typeof handler === 'function') {
        handler()
      }
    },
    []
  )

  return (
    <div className="flex h-screen w-screen bg-gray-100" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="w-1/6 bg-white p-4 border-r">
        {components.map((comp, index) => (
          <comp.component
            key={index}
            draggable="true"
            onDragStart={(e) => {
              onDragStart(e, comp.name)
              const rect = e.target.getBoundingClientRect()
              offsetX = e.clientX - rect.x
              offsetY = e.clientY - rect.y
            }}
            onDragEnd={(e) => {
              const rect = containerRef.current?.getBoundingClientRect()
              const newOffsetX = e.clientX - (rect?.x ?? 0) - offsetX
              const newOffsetY = e.clientY - (rect?.y ?? 0) - offsetY
              dispatch(
                addComponentInList(

                  {
                    name: comp.name,
                    style: {
                      left: newOffsetX,
                      top: newOffsetY,
                      width: 300,
                      height: 100
                    }
                  }
                )
              )
              e.preventDefault()
            }}
          />
        ))}
      </div>
      <div
        className="w-5/6 p-4 relative"
        ref={containerRef}
        onMouseDown={handleMouseDownOnContainer}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute top-0 bottom-0 border border-red-300"
          style={{ left: String(linePosition.x) + 'px' }}
        ></div>
        <div
          className="absolute left-0 right-0 border border-red-300"
          style={{ top: String(linePosition.y) + 'px' }}
        ></div>

        {componentList.map((Item, index) => {
          const NowCom = componentsMap.get(Item.name)
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: Item.style.left,
                top: Item.style.top,
                width: Item.style.width,
                height: Item.style.height
              }}
              className={Item.focus === true ? 'border-red-300 border-2' : ''}
              onMouseDown={(e) => {
                handleMouseDownOnComponent(e, index)
              }}
            >
              <NowCom />
            </div>
          )
        })}
      </div>
      <div className="w-1/6 p-4 border-l bg-white">属性选择</div>
    </div>
  )
}

export default Editor
