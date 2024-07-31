import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import '../resources/customer.css'
import axios from 'axios'
import { message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

function EditUser() {

    const [client, setClient] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    const handleInput = (event) => {
        const { name, value } = event.target
        setClient({ ...client, [name]: value })
    }

    const loadCustomerDetails = async (id) => {

        try {

            const response = await axios.get(`/api/customers/edit-customer/${id}`, {
            });
            if (response.data.success) {
                setClient(response.data.data[0])
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {

        loadCustomerDetails(id)
    }, [])

    const editDetails = async (client, id) => {

        try {
            const response = await axios.put(`/api/customers/edit-customer/${id}`, client, {

            })
            if (response.data.success) {

            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    const updateDetails = () => {
        editDetails(client, id)
        navigate('/home')
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Customer data updated successfully',
            showConfirmButton: false,
            timer: 2000
        })
    }

    return (

        <div>
            <Header />
            <div className='d-flex align-items-center justify-content-center mt-4'>
                <h4>EDIT CUSTOMER</h4>
            </div>
            <div className='container mt-5'>
                <form>
                    <div className="row">
                        <div className="mb-3 col-lg-6 col-md-6 col-12 ">
                            <label for="exampleInputEmail1" className="form-label">First Name</label>
                            <input type="text" name='firstName' onChange={(e) => handleInput(e)} className="form-control" value={client.firstName} />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Last Name</label>
                            <input type="text" name='lastName' onChange={(e) => handleInput(e)} className="form-control" value={client.lastName} />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Email</label>
                            <input type="email" name='email' onChange={(e) => handleInput(e)} className="form-control" value={client.email} />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Phone</label>
                            <input type="number" name='phone' onChange={(e) => handleInput(e)} className="form-control" value={client.phone} />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Address</label>
                            <input type="text" name='address' onChange={(e) => handleInput(e)} className="form-control" value={client.address} />
                        </div>
                        <div className="mb-3 col-lg-6 col-md-6 col-12">
                            <label for="exampleInputPassword1" className="form-label">Salesman</label>
                            <input type="text" name='salesman' onChange={(e) => handleInput(e)} className="form-control" value={client.salesman} />
                        </div>
                        <button type="submit" onClick={() => updateDetails()} className="btn btn-primary submitBtn">Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default EditUser
