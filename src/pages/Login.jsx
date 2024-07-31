import React from 'react'
import { Form, message } from 'antd'
import '../resources/login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {

      const response = await axios.post("/api/users/login", values)

      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data)
        navigate("/home")
      } else {
        message.error(response.data.message);
      }
    } catch (error) {

      message.error(error.message)
    }
  }

  return (
    <div className='h-screen d-flex justify-content-center align-items-center'>
      <div className='w-400 card p-3'>
        <h2 className='text'>Login</h2>
        <hr />
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item label="email" name="email">
            <input type="email" />
          </Form.Item>
          <Form.Item label="password" name="password">
            <input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center">
            <Link to="/register" className='atag'>Click Here To Register..</Link>
            <button type='submit' className='btn btn-success'>Login</button>
          </div>
        </Form>

      </div>
    </div>
  )
}

export default Login
