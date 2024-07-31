import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../resources/home.css'
import { FaPen, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd'
import Swal from 'sweetalert2'

function Home() {

    const [customer, setCustomer] = useState([])

    const getCustomers = async () => {

        try {

            const response = await axios.get("api/customers/get-customers-by-id", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            if (response.data.success) {
                setCustomer(response.data.data)
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        getCustomers()
    }, [])

    const deleteCustomer = async (id) => {

        try {
            Swal.fire({
                title: 'Are you sure to delete the customer?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios.delete(`/api/customers/delete-customer/${id}`)
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    window.location.reload()
                }
            })
        } catch (error) {
            message.error(error.message)
        }

    }

    return (
        <div>
            <Header />
            <div className="mt-5 hai">
                <div className="container">
                    <div className="add_btn mt-2">
                        <Link to='/add-customer'> <button className='btn btn-success'>Add Customer</button></Link>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover mt-3">
                            <thead>
                                <tr className='table-dark'>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Salesman</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customer.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.firstName} {user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.address}</td>
                                            <td>{user.salesman}</td>
                                            <td className='d-flex justify-content-between'>
                                                <Link to={`/edit-customer/${user._id}`} ><button className='btn btn-primary'><FaPen /></button></Link>
                                                <button className='btn btn-danger' onClick={() => deleteCustomer(user._id)}><FaTrash /></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
