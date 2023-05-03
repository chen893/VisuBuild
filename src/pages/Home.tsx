import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (

    <div className="flex flex-col items-center justify-center  h-screen  w-screen  bg-gray-100 ">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Frontend Visual Builder!</h1>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Log in
        </Link>
        <Link to="/editor" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Go to Editor
        </Link>
      </div>
    </div>
  )
}

export default Home
