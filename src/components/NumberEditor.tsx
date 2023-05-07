import { InputNumber } from 'antd'
import { type EditorProps } from '../type/editor'

const NumberEditor: React.FC<EditorProps> = ({ attribute, value, onChange }) => {
  const handleChange = (value: number | null): void => {
    onChange(Number(value))
  }

  return (
    <div className="my-2">
      <label htmlFor={attribute.name} className="block text-sm font-medium text-gray-700">
        {attribute.name}
      </label>
      <InputNumber
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        id={attribute.name}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
export default NumberEditor
