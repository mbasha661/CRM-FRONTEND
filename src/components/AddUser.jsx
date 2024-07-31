import React, { useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import '../resources/customer.css'
import axios from 'axios'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AddUser() {

    const navigate = useNavigate()

    const defaultValue = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        salesman: ''
    }

    const [customer, setCustomer] = useState(defaultValue)

    const handleInput = (event) => {
        const { name, value } = event.target
        setCustomer({ ...customer, [name]: value })
    }

    const addDetails = async (event) => {

        event.preventDefault()

        try {
            const response = await axios.post("/api/customers/add-customer", customer, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (response.data.success) {
                navigate("/home")
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Customer added successfully',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <div>
            <Header />
            <div className='d-flex align-items-center justify-content-center mt-4'>
                <h4>ADD CUSTOMER</h4>
            </div>
            <div className='container mt-5'>
                <form>
                    <div className="row">
                        <div className="mb-3 col-lg-6 col-md-6 col-12 ">
                            <label for="exampleInputEmail1" className="form-label">First Name</label>
                            <input type="text" name='firstName' onChange={handleInput} className="form-control" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Last Name</label>
                            <input type="text" name='lastName' onChange={handleInput} className="form-control" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Email</label>
                            <input type="email" name='email' onChange={handleInput} className="form-control" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Phone</label>
                            <input type="number" name='phone' onChange={handleInput} className="form-control" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Address</label>
                            <input type="text" name='address' onChange={handleInput} className="form-control" />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Salesman</label>
                            <input type="text" name='salesman' onChange={handleInput} className="form-control" />
                        </div>
                        <button type="submit" onClick={addDetails} className="btn btn-primary submitBtn">Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default AddUser
