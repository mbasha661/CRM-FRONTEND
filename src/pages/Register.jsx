import { Form, message } from 'antd'
import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../resources/login.css'

function Register() {

    const navigate = useNavigate()

    const onFinish = async (values) => {


        try {

            const response = await axios.post("/api/users/register", values)

            if (response.data.success) {
                message.success(response.data.message);
                navigate("/")
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
                <h2 className='text'>Register</h2>
                <hr />
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label="Name" name="name">
                        <input type="text" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <input type="email" />
                    </Form.Item>
                    <Form.Item label="Number" name="number">
                        <input type="number" />
                    </Form.Item>
                    <Form.Item label="password" name="password">
                        <input type="password" />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword">
                        <input type="password" />
                    </Form.Item>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/" className='atag'>Click Here To Login..</Link>
                        <button type='submit' className='btn btn-success'>Register</button>
                    </div>
                </Form>

            </div>
        </div>
    )
}

export default Register
