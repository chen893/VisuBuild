import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash-es'
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

interface EditorState {
  componentList: Component[]
  linePosition: { x: number, y: number }
  startPosition: {
    x: number
    y: number
    isMove: boolean
  }
  startListStyle: Array<{ left: number, top: number }>
  lines: {
    x: Array<{ left: number, width: number }>
    y: Array<{ top: number, height: number }>
  }
  lastIndex: number
  history: Component[][]
  historyIndex: number
  copiedComponents: Component[]
}
const initialState: EditorState = {
  componentList: [],
  linePosition: { x: -1, y: -1 },
  startPosition: {
    x: 0,
    y: 0,
    isMove: false
  },
  startListStyle: [],
  lines: {
    x: [],
    y: []
  },
  lastIndex: -1,
  history: [[]],
  historyIndex: 0,
  copiedComponents: []
}

function getMidPoint (point: number, length: number): number {
  return point + length / 2
}

function findLinePosition (
  targetCoord: number,
  targetLength: number,
  linesArr: Array<{ start: number, length: number }>
): number {
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
function updateLinePositionA (
  comItemStyle: {
    left: number
    top: number
    width: number
    height: number
  },
  lines: {
    x: Array<{ left: number, width: number }>
    y: Array<{ top: number, height: number }>
  },
  linePosition: {
    x: number
    y: number
  }
): { x: number, y: number } {
  const { left, top, width, height } = comItemStyle

  const newY = findLinePosition(
    top,
    height,
    lines.y.map((item) => ({
      start: item.top,
      length: item.height
    }))
  )
  const newX = findLinePosition(
    left,
    width,
    lines.x.map((item) => ({
      start: item.left,
      length: item.width
    }))
  )

  return {
    x: newX === -1 ? linePosition.x : newX,
    y: newY === -1 ? linePosition.y : newY
  }
}

const updateHistory = (state: EditorState): { history: Component[][], historyIndex: number } => {
  const { history, historyIndex, componentList } = state
  const newHistory = [
    ...history.slice(0, historyIndex + 1),
    cloneDeep(componentList)
  ]
  const newHistoryIndex = historyIndex + 1
  return { history: newHistory, historyIndex: newHistoryIndex }
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    addComponentInList: (state, action) => {
      state.componentList.push(action.payload)
      const updatedData = updateHistory(state)
      state.history = updatedData.history
      state.historyIndex = updatedData.historyIndex
    },
    changeComponentFocus: (
      state,
      action: {
        payload: {
          reset?: boolean
          index?: number
          isShiftKey?: boolean
        }
      }
    ) => {
      if (action.payload.reset === true) {
        state.componentList = state.componentList.map((item) => {
          item.focus = false
          return item
        })
        return
      }
      const index = action.payload.index
      const isShiftKey = action.payload.isShiftKey
      state.componentList = state.componentList.map((comItem, comIndex) => {
        if (index === comIndex) {
          comItem.focus = true
        } else if (isShiftKey === false) {
          comItem.focus = false
        }
        return comItem
      })

      const updatedData = updateHistory(state)
      state.history = updatedData.history
      state.historyIndex = updatedData.historyIndex
    },
    updateComponentPosition: (
      state,
      action: PayloadAction<{ clientX: number, clientY: number }>
    ) => {
      const { clientX, clientY } = action.payload
      const { lastIndex } = state

      state.componentList.forEach((comItem, comIndex) => {
        if (comItem.focus === true) {
          comItem.style.left =
            clientX -
            state.startPosition.x +
            state.startListStyle[comIndex].left
          comItem.style.top =
            clientY -
            state.startPosition.y +
            state.startListStyle[comIndex].top

          if (comIndex === lastIndex) {
            const newLinePosition = updateLinePositionA(
              comItem.style,
              state.lines,
              state.linePosition
            )
            state.linePosition = newLinePosition
          }
        }
      })
    },
    updateLinePosition: (state, action) => {
      state.linePosition = action.payload
    },
    handleMouseDownOnCom: (state, action) => {
      const { clientX, clientY, index } = action.payload
      const { componentList } = state
      state.startPosition = {
        x: clientX,
        y: clientY,
        isMove: true
      }

      state.startListStyle = state.componentList.map((item) => ({
        left: item.style.left,
        top: item.style.top
      }))
      state.lastIndex = index

      state.lines.y = []
      state.lines.x = []
      const noFocusList = componentList.filter((item) => item.focus !== true)
      noFocusList.forEach((item) => {
        const { left, top, width, height } = item.style
        state.lines.x.push({ left, width })
        state.lines.y.push({ top, height })
      })
      const updatedData = updateHistory(state)
      state.history = updatedData.history
      state.historyIndex = updatedData.historyIndex
    },
    resetPositionAndLines: (state, action) => {
      state.startPosition.isMove = false
      state.lines.x = []
      state.lines.y = []
    },
    deleteFocusedComponents: (state) => {
      state.componentList = state.componentList.filter((component) => component.focus !== true)
      const updatedData = updateHistory(state)
      state.history = updatedData.history
      state.historyIndex = updatedData.historyIndex
    },
    copyComponents: (state) => {
      state.copiedComponents = state.componentList.filter((component) => component.focus)
      const updatedData = updateHistory(state)
      state.history = updatedData.history
      state.historyIndex = updatedData.historyIndex
    },
    pasteComponents: (state) => {
      const newComponents = state.copiedComponents.map((component) => {
        const newComponent = cloneDeep(component)
        newComponent.style.left += 10
        newComponent.style.top += 10
        return newComponent
      })
      state.componentList.push(...newComponents)
      const updatedData = updateHistory(state)
      state.history = updatedData.history
      state.historyIndex = updatedData.historyIndex
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1
        state.componentList = cloneDeep(state.history[state.historyIndex])
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1
        state.componentList = cloneDeep(state.history[state.historyIndex])
      }
    }
  }
})

export const {
  addComponentInList,
  updateLinePosition,
  changeComponentFocus,
  updateComponentPosition,
  handleMouseDownOnCom,
  resetPositionAndLines,
  deleteFocusedComponents,
  copyComponents,
  pasteComponents,
  undo,
  redo
} = editorSlice.actions
export default editorSlice.reducer
