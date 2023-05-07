import React from 'react'
interface ImageComponentProps {
  src: string
  alt?: string
  width?: number
  height?: number
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width,
  height
}) => {
  return (
    <img
      src={src}
      alt={alt || ''}
      style={{ width: width || 'auto', height: height || 'auto' }}
    />
  )
}

export default ImageComponent
