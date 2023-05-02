import { Input, Rate, Switch } from 'antd'
import React, { useCallback, useEffect, useRef, useState } from 'react'

interface Component {
  com: any
  name: string
  focus?: boolean
  style: {
    left: number
    top: number
  }
}

const components = [
  { name: 'Input', component: Input },
  { name: 'Rate', component: Rate },
  { name: 'Switch', component: Switch }
]

const Editor: React.FC = () => {
  const [componentList, setComponentList] = useState<Component[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const currentComponent = useRef<string>('')
  const startPosition = useRef({
    x: 0,
    y: 0,
    isMove: false
  })
  const startListStyle = useRef<Array<{ left: number, top: number }>>([])

  const onDragStart = useCallback((e: React.DragEvent, componentName: string) => {
    currentComponent.current = componentName
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleMouseDownOnComponent = useCallback(
    (e: MouseEvent, index: number) => {
      if (e.button !== 0) return
      e.preventDefault()
      e.stopPropagation()
      setComponentList((preComponentList) => {
        const newList = preComponentList.map((comItem, comIndex) => {
          if (index === comIndex) {
            comItem.focus = true
          } else if (!e.shiftKey) {
            comItem.focus = false
          }
          return comItem
        })
        return newList
      })
    },
    [componentList]
  )

  // 获取当前鼠标位于拖拽元素的相对位置。
  let offsetX = 0
  let offsetY = 0

  const handleMouseDownOnContainer = useCallback((e: MouseEvent) => {
    if (e.button !== 0) return
    console.log('first')
    startPosition.current = {
      x: e.clientX,
      y: e.clientY,
      isMove: true
    }

    startListStyle.current = componentList.map((item) => ({
      left: item.style.left,
      top: item.style.top
    }))
  }, [componentList, startPosition.current, startListStyle.current])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!startPosition.current.isMove) return

    const isMove = componentList.some((item) => item.focus === true)

    if (isMove) {
      setComponentList((preComponentList) => {
        const newList = preComponentList.map((comItem, comIndex) => {
          if (comItem.focus === true) {
            comItem.style.left = (e.clientX - startPosition.current.x) + startListStyle.current[comIndex].left
            comItem.style.top = (e.clientY - startPosition.current.y) + startListStyle.current[comIndex].top
          }
          return comItem
        })
        return newList
      })
    }
  }, [componentList, startPosition.current, startListStyle.current])

  const handleMouseUp = useCallback((e: MouseEvent) => {
    startPosition.current.isMove = false
  }, [])

  useEffect(() => {
    if (containerRef.current == null) return

    containerRef.current.addEventListener('mousemove', handleMouseMove)
    containerRef.current.addEventListener('mouseup', handleMouseUp)
    containerRef.current.addEventListener('mousedown', handleMouseDownOnContainer)
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove)
      containerRef.current?.removeEventListener('mouseup', handleMouseUp)
      containerRef.current?.removeEventListener('mousedown', handleMouseDownOnContainer)
    }
  }, [containerRef.current, handleMouseMove, handleMouseUp, handleMouseDownOnContainer])

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <div className="w-1/6 bg-white p-4 border-r">
        {components.map((comp, index) => (
          <comp.component
            key={index}
            draggable="true"

            onDragStart={(e) => {
              onDragStart(e, comp.name)
              const rect = e.target.getBoundingClientRect()
              //  rect.x 获取元素相对于位置，clientX 获取鼠标位置, clientX - rect.x 获取元素
              //   e.dataTransfer.setData("text/plain", JSON.stringify({ id: e.target.id, x: e.clientX - rect.left, y: e.clientY - rect.top }));
              offsetX = e.clientX - rect.x
              offsetY = e.clientY - rect.y
            }}
            onDragEnd={(e) => {
              const rect = containerRef.current?.getBoundingClientRect()
              const newOffsetX = e.clientX - (rect?.x ?? 0) - offsetX
              const newOffsetY = e.clientY - (rect?.y ?? 0) - offsetY

              setComponentList((item) => ([
                ...item,
                {
                  com: comp.component,
                  name: comp.name,
                  style: { left: newOffsetX, top: newOffsetY }
                }
              ]))
              e.preventDefault()
            }}
          />
        ))}
      </div>
      <div className="w-5/6 p-4 relative" ref={containerRef} >

        {componentList.map((Item, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: Item.style.left,
              top: Item.style.top
            }}
            className={Item.focus === true ? 'border-red-300 border-2' : ''}
            onMouseDown={(e) => { handleMouseDownOnComponent(e, index) }}

          >
            <Item.com />
          </div>
        ))}
      </div>
      <div className="w-1/6 p-4 border-l bg-white">属性选择</div>
    </div>
  )
}

export default Editor
