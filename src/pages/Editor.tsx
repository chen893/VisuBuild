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
  copyComponents,
  setSelectComponentIndex
} from '../store/editor'
import { components, componentsMap } from '../components/AvailableComponents'
import AttributeEditor from '../components/AttributeEditor'
import TextNode from '../components/common/TextNode'
import Carousel from '../components/common/Carousel'

const Editor: React.FC = () => {
  const componentList = useSelector(
    (state: RootState) => state.editor.componentList
  )
  const linePosition = useSelector(
    (state: RootState) => state.editor.linePosition
  )
  const selectedComponentIndex = useSelector(
    (state: RootState) => state.editor.selectComponentIndex
  )
  const dispatch = useDispatch()
  const containerRef = useRef<HTMLDivElement>(null)
  const startPosition = useSelector(
    (state: RootState) => state.editor.startPosition
  )

  const startListStyle = useSelector(
    (state: RootState) => state.editor.startListStyle
  )

  const onDragStart = useCallback(
    (e: React.DragEvent, componentName: string) => {
      e.dataTransfer.effectAllowed = 'move'
    },
    []
  )

  const handleMouseDownOnComponent = useCallback(
    (e: MouseEvent, index: number) => {
      e.stopPropagation()
      if (e.button !== 0) return

      const clientX = e.clientX
      const clientY = e.clientY
      dispatch(setSelectComponentIndex(index))
      dispatch(handleMouseDownOnCom({ clientX, clientY, index }))
      dispatch(changeComponentFocus({ index, isShiftKey: e.shiftKey }))
    },
    []
  )

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
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const keyCombination = `${e.ctrlKey ? 'Ctrl+' : ''}${
      e.shiftKey ? 'Shift+' : ''
    }${e.key}`

    const handler = keyHandlers[keyCombination]
    if (typeof handler === 'function') {
      handler()
    }
  }, [])

  return (
    // ...
    <div
      className="flex h-screen w-screen bg-gray-100"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="w-1/6 bg-white p-4 border-r">
        {/* <TextNode dra></TextNode> */}
        {components.map((comp, index) => (
          <div key={index}
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
              addComponentInList({
                name: comp.name,
                props: {
                  left: newOffsetX,
                  top: newOffsetY,
                  width: 300,
                  height: 100
                }
              })
            )
            e.preventDefault()
          }}>
            <div className='border border-black mb-10'>
              {comp.name}
            </div>
          {/* <comp.component/> */}
          </div>

        ))}
      </div>
      <div className="w-5/6 p-4 flex justify-center items-center">
        <div
          className="relative bg-white border border-gray-300 rounded-md shadow-md"
          style={{
            width: '375px',
            height: '667px',
            overflow: 'hidden'
          }}
        >
          <div
            className="p-4"
            ref={containerRef}
            onMouseDown={handleMouseDownOnContainer}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%'
            }}
          >
            {/* <div
          className="absolute top-0 bottom-0 border border-red-300"
          style={{ left: String(linePosition.x) + 'px' }}
        ></div>
        <div
          className="absolute left-0 right-0 border border-red-300"
          style={{ top: String(linePosition.y) + 'px' }}
        ></div> */}
            {componentList.map((Item, index) => {
              const CurrentComponent = componentsMap.get(Item.name)
              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: Item.props.left,
                    top: Item.props.top,
                    width: Item.props.width,
                    height: Item.props.height
                  }}
                  className={
                    Item.focus === true ? 'border-red-300 border-2' : ''
                  }
                  onClick={
                    (e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }
                  }
                  onMouseDown={(e) => {
                    handleMouseDownOnComponent(e, index)
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                >
                  <CurrentComponent {...Item.props}/>
                </div>
              )
            })}

            {/* <Carousel ></Carousel> */}
          </div>
        </div>
      </div>
      <div className="w-1/6 p-4 border-l bg-white">
        <AttributeEditor
          selectedComponent={
            selectedComponentIndex >= 0
              ? componentList[selectedComponentIndex]
              : null
          }
        />
      </div>
    </div>
  )
}

export default Editor
