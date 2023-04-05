import { Input } from 'antd'
import React from 'react'

const Editor: React.FC = () => {
  return (
    <div className="flex h-screen w-screen  bg-gray-100">
      <div className="w-1/6 bg-white p-4 border-r">
        {
          [12, 3, 4, 4].map((item) => {
            return <Input key={item} />
          })
        }
      </div>
      <div className="w-5/6 p-4">

      </div>
      <div className='w-1/6 p-4 border-l bg-white'>
        属性选择
      </div>
    </div>
  )
}

export default Editor
