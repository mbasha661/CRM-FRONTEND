import { message } from 'antd'
import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await axios.get("/api/users/logout")
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.removeItem('token');
                navigate("/")
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <div>
            <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
                <div className="container">
                    <Link to='/home' className='text-decoration-none'><h4 className="navbar-brand">Client <span className='text-warning'>Max</span></h4></Link>
                    <button className='btn btn-danger' onClick={handleLogout} >Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default Header
