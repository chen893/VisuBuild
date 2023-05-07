export interface Component {
  name: string
  focus?: boolean
  type?: 'container' | 'component'
  props: {
    left: number
    top: number
    width: number
    height: number
  }
}

export interface EditorProps {
  attribute: Attribute
  value: any
  onChange: (newValue: any) => void
}

export type AttributeType = 'text' | 'number' | 'boolean'

export interface Attribute {
  name: string
  type: AttributeType
}
