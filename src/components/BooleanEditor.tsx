import { Checkbox } from 'antd'
import { type EditorProps } from '../type/editor'
import { type CheckboxChangeEvent } from 'antd/es/checkbox'

const BooleanEditor: React.FC<EditorProps> = ({ attribute, value, onChange }) => {
  const handleChange = (e: CheckboxChangeEvent): void => {
    onChange(e.target.value)
  }
  return (
    <div className="my-2 flex items-center">
      <label htmlFor={attribute.name} className="mr-2 text-sm font-medium text-gray-700">
        {attribute.name}
      </label>
      <Checkbox
        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        id={attribute.name}

        checked={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default BooleanEditor
