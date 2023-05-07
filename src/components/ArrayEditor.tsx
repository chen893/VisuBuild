import React, { useState } from 'react'
import { Select } from 'antd'
import TextEditor from './TextEditor'
import NumberEditor from './NumberEditor'
import BooleanEditor from './BooleanEditor'
import { cloneDeep } from 'lodash-es'
const { Option } = Select

const ArrayEditor = ({ attribute, value: propsValue, onChange }) => {
  const [value, setValue] = useState(propsValue)
  const [arrayLength, setArrayLength] = useState(value.length)

  const handleLengthChange = (newLength) => {
    setArrayLength(newLength)
    let newValue = []
    if (newLength === value.length) return null
    else {
      newValue = cloneDeep(value.slice(0, newLength))
      if (newLength > value.length) {
        for (let i = value.length; i < newLength; i++) {
          newValue.push({})
        }
      }
      setValue(newValue)
      onChange(newValue)
    }
  }

  const handleItemChange = (index, attrName, newValue) => {
    const updatedValue = cloneDeep([...value])
    updatedValue[index][attrName] = newValue
    setValue(updatedValue)
    onChange(updatedValue)
  }

  const renderEditor = (attr, index, attrName) => {
    switch (attr.type) {
      case 'text':
        return (
          <TextEditor
            key={attr.name}
            attribute={attr}
            value={value[index]?.[attrName]}
            onChange={(newValue) => { handleItemChange(index, attrName, newValue) }}
          />
        )
      case 'number':
        return (
          <NumberEditor
            key={attr.name}
            attribute={attr}
            value={value[index]?.[attrName]}
            onChange={(newValue) => { handleItemChange(index, attrName, newValue) }}
          />
        )
      case 'boolean':
        return (
          <BooleanEditor
            key={attr.name}
            attribute={attr}
            value={value[index]?.[attrName]}
            onChange={(newValue) => { handleItemChange(index, attrName, newValue) }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div>
      <div>{attribute.name}</div>
      <Select value={arrayLength} onChange={handleLengthChange}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <Option key={n} value={n}>
            {n}
          </Option>
        ))}
      </Select>
      {Array.from({ length: arrayLength }, (_, i) => (
        <div key={i}>
          {attribute.sample.map((attr) =>
            renderEditor(attr, i, attr.name)
          )}
        </div>
      ))}
    </div>
  )
}

export default ArrayEditor
