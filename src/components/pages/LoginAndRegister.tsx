
import React, { useState } from 'react'
import { Input, Button, Form } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import 'tailwindcss/tailwind.css'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin: () => void = () => {
    console.log('login')
  }

  return (
    <div className="flex justify-center items-center ">
      <Form onFinish={handleLogin}>
        <Form.Item>
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister: () => void = () => {
    console.log('register')
  }

  return (
    <div className="flex justify-center items-center ">
      <Form onFinish={handleRegister}>
        <Form.Item>
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value) }}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const LoginAndRegister: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)

  return (
    <div className=" bg-gray-100 flex items-center justify-center  w-screen h-screen">
      <div className="w-450 bg-white border-gray-300 border-solid border-2 p-10 rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-5">
          <Button
            type={isLogin ? 'primary' : 'default'}
            onClick={() => { setIsLogin(true) }}
          >
            Log in
          </Button>
          <Button
            type={!isLogin ? 'primary' : 'default'}
            onClick={() => { setIsLogin(false) }}
          >
            Register
          </Button>
        </div>
        {isLogin ? <Login /> : <Register />}
      </div>
    </div>
  )
}

export default LoginAndRegister
