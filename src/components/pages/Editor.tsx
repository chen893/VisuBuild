import { Input, Rate, Switch } from 'antd'
import React, { useCallback, useRef, useState } from 'react'

interface Component {
  com: any
  name: string
  focus?: boolean
  style: {
    left: number
    top: number
    width: number
    height: number
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
  const lastIndex = useRef<number>(-1)
  const startPosition = useRef({
    x: 0,
    y: 0,
    isMove: false
  })
  const startListStyle = useRef<Array<{ left: number, top: number }>>([])
  const lines = useRef<{ x: Array<{ left: number, width: number }>, y: Array<{ top: number, height: number }> }>({ x: [], y: [] })
  const onDragStart = useCallback((e: React.DragEvent, componentName: string) => {
    currentComponent.current = componentName
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleMouseDownOnComponent = useCallback(
    (e: MouseEvent, index: number) => {
      e.stopPropagation()
      if (e.button !== 0) return
      startPosition.current = {
        x: e.clientX,
        y: e.clientY,
        isMove: true
      }

      startListStyle.current = componentList.map((item) => ({
        left: item.style.left,
        top: item.style.top
      }))
      lastIndex.current = index

      lines.current.y = []
      lines.current.x = []
      const noFocusList = componentList.filter((item) => item.focus !== true)
      noFocusList.forEach((item) => {
        const { left, top, width, height } = item.style
        lines.current.x.push({ left, width })
        lines.current.y.push({ top, height })
        // function pushY (...args: number[]): void {
        //   lines.current.y.push(...args)
        // }
        // function pushX (...args: number[]): void {
        //   lines.current.x.push(...args)
        // }
        // pushY(top, top + height, top + (height) / 2)
        // pushX(left, left + width, left + (width) / 2)
      })
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

  const [linePosition, setLinePosition] = useState<{ x: number, y: number }>({ x: -1, y: -1 })
  const handleMouseDownOnContainer = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return

    setComponentList((preComponentList) => {
      const newList = preComponentList.map((comItem, comIndex) => {
        comItem.focus = false
        return comItem
      })
      return newList
    })
  }, [componentList, startPosition.current, startListStyle.current])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!startPosition.current.isMove) return

    const isMove = componentList.some((item) => item.focus === true)

    if (isMove) {
      // const lastComponent = componentList[lastIndex.current]

      setComponentList((preComponentList) => {
        const newList = preComponentList.map((comItem, comIndex) => {
          if (comItem.focus === true) {
            comItem.style.left = (e.clientX - startPosition.current.x) + startListStyle.current[comIndex].left
            comItem.style.top = (e.clientY - startPosition.current.y) + startListStyle.current[comIndex].top
          }
          if (comIndex === lastIndex.current) {
            const getMidPoint = (point: number, length: number): number => {
              return point + length / 2
            }

            const findLinePosition = (
              targetCoord: number,
              targetLength: number,
              linesArr: Array<{ start: number, length: number }>
            ): number => {
              const targetMid = getMidPoint(targetCoord, targetLength)

              for (const line of linesArr) {
                const { start: lineCoord, length: lineLength } = line
                const lineMid = getMidPoint(lineCoord, lineLength)

                if (lineMid === targetMid) {
                  return lineMid
                }

                for (const linePoint of [lineCoord, lineCoord + lineLength]) {
                  for (const targetPoint of [
                    targetCoord,
                    targetCoord + targetLength
                  ]) {
                    if (Math.abs(linePoint - targetPoint) < 10) {
                      return linePoint
                    }
                  }
                }
              }

              return -1
            }

            const updateLinePosition = (
              comItemStyle: {
                left: number
                top: number
                width: number
                height: number
              },
              lines: { x: Array<{ left: number, width: number }>, y: Array<{ top: number, height: number }> }
            ): void => {
              const { left, top, width, height } = comItemStyle

              const newY = findLinePosition(top, height, lines.y.map(item => ({ start: item.top, length: item.height })))
              const newX = findLinePosition(left, width, lines.x.map(item => ({ start: item.left, length: item.width })))

              setLinePosition((prePosition) => {
                return {
                  x: newX === -1 ? prePosition.x : newX,
                  y: newY === -1 ? prePosition.y : newY
                }
              })
            }

            updateLinePosition(comItem.style, lines.current)
          }
          return comItem
        })
        return newList
      })
    }
  }, [componentList, startPosition.current, startListStyle.current])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    startPosition.current.isMove = false
    lines.current.x = []
    lines.current.y = []
  }, [])

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
                  style: { left: newOffsetX, top: newOffsetY, width: 300, height: 100 }
                }
              ]))
              e.preventDefault()
            }}
          />
        ))}
      </div>
      <div className="w-5/6 p-4 relative"
          ref={containerRef}
          onMouseDown={handleMouseDownOnContainer}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
      >
        <div className='absolute top-0 bottom-0 border border-red-300 ' style={{ left: String(linePosition.x) + 'px' }}></div>
        <div className='absolute left-0 right-0 border border-red-300' style={{ top: String(linePosition.y) + 'px' }}></div>
        {componentList.map((Item, index) => (
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
