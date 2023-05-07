import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/index'

const Home: React.FC = () => {
  const [list, setList] = useState([])
  console.log('first')
  useEffect(() => {
    async function fetchVisualizations (): void {
      const response = await axios.get('http://localhost:3000/json-list')
      setList(response.data)
      console.log(response.data)
    }

    fetchVisualizations()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/json-list/${id}`) // Replace with your API endpoint
      setList(list.filter((item) => item.id !== id))
      console.log('删除成功')
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
<div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100">
  {/* <h1 className="text-4xl font-bold mb-6">Welcome to the Frontend Visual Builder!</h1> */}
  <div className="flex space-x-4 mb-6">
    <Link
      to="/login"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Log in
    </Link>
    <Link
      to="/editor"
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
      Go to Editor
    </Link>
  </div>
  <div className="w-2/3 bg-white rounded-lg shadow-md p-6 overflow-auto" style={{ maxHeight: '70vh' }}>
    <ul className="divide-y divide-gray-200">
      {list.map((item) => (
        <li key={item.id} className="py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
            <button
              onClick={async () => { await handleDelete(item.id) }}
              className="text-red-600 hover:text-blue-800 font-medium"
            >
              删除
            </button>
          </div>
          <Link
            to={`/editor?id=${item.id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            编辑
          </Link>
        </li>
      ))}
    </ul>
  </div>
</div>

  )
}

export default Home
