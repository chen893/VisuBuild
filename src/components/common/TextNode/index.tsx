import React from 'react'

interface TextNodeProps {
  text: string
}

const TextNode: React.FC<TextNodeProps> = (props) => {
  const { text = '单行文本' } = props
  return <div >{text}</div>
}

export default TextNode
