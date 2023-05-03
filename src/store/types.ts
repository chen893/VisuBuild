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

export interface EditorState {
  componentList: Component[]
  linePosition: { x: number, y: number }
  history: Component[][]
  historyIndex: number
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
}

export interface RootState {
  editor: EditorState
}
