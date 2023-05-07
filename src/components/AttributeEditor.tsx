import { useDispatch, useSelector } from 'react-redux'
import { type Component, type Attribute } from '../type/editor'
import BooleanEditor from './BooleanEditor'
import NumberEditor from './NumberEditor'
import TextEditor from './TextEditor'
import { editAttribute } from '../store/editor'
import { type RootState } from '../store'
import { componentAttributes } from './AvailableComponents'
import ArrayEditor from './ArrayEditor'

/**
 * Get attributes for a given component name.
 *
 * @param componentName The name of the component.
 * @returns An array of attributes for the component.
 */
function getComponentAttributes (componentName: string): Attribute[] {
  if (componentName in componentAttributes) {
    return componentAttributes[componentName]
  } else {
    return []
  }
}

interface AttributeEditorProps {
  selectedComponent: Component | null
}
export const renderEditor = (attribute: Attribute, props: any, dispatch) => {
  const value = props[attribute.name]
  switch (attribute.type) {
    case 'text':
      return (
        <TextEditor
          key={attribute.name}
          attribute={attribute}
          value={value}
          onChange={(newValue) => {
            dispatch(editAttribute({ name: attribute.name, value: newValue }))
            // Update the component's attribute in the Redux store.
          }}
        />
      )
    case 'number':
      return (
        <NumberEditor
          key={attribute.name}
          attribute={attribute}
          value={value}
          onChange={(newValue) => {
            dispatch(editAttribute({ name: attribute.name, value: newValue }))
          }}
        />
      )
    case 'boolean':
      return (
        <BooleanEditor
          key={attribute.name}
          attribute={attribute}
          value={value}
          onChange={(newValue) => {
            dispatch(editAttribute({ name: attribute.name, value: newValue }))
          }}
        />
      )
    case 'array':
      return (
        <ArrayEditor
          key={attribute.name}
          attribute={attribute}
          value={value}
          onChange={(newValue) => {
            dispatch(editAttribute({ name: attribute.name, value: newValue }))
          }}
        />
      )
    default:
      return null
  }
}
const AttributeEditor: React.FC<AttributeEditorProps> = ({
  selectedComponent
}: AttributeEditorProps) => {
  if (selectedComponent === null) {
    return <div>No component selected</div>
  }
  const dispatch = useDispatch()
  const selectComponentIndex = useSelector((state: RootState) => state.editor.selectComponentIndex)
  const componentList = useSelector((state: RootState) => state.editor.componentList)
  const currentComponent = componentList[selectComponentIndex]
  const attributes = getComponentAttributes(selectedComponent.name)

  return (
    <div>
      {attributes.map((attribute) => renderEditor(attribute, currentComponent.props, dispatch))}
    </div>
  )
}
export default AttributeEditor
