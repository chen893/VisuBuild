interface Component {
  name: string
  focus?: boolean
  props: {
    left: number
    top: number
    width: number
    height: number
  }
}

export interface EditorState {
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
  selectComponentIndex: number
}

export interface RootState {
  editor: EditorState
}
