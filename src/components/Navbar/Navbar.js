import React, { useContext } from 'react'
import './navbar.css'
import { AiFillPlusCircle, AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Auth'

const Navbar = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <nav className='sticky-top row p-2 m-0 bg-ordark text-light w-100'>
                <div className='col-md-6'>
                    <Link to='/home'><p className='mb-0 fw-bold text-center fs-3' style={{ letterSpacing: '3px' }}>OTT Rentals</p></Link>
                </div>
                <div className='col-md-6 detach-nav'>
                    <ul className='p-0 h-100 m-0 d-flex justify-content-center'>
                        {currentUser && <li><Link to='/newpost'><AiFillPlusCircle className='nav-icons' /></Link></li>}
                        {currentUser && <li><Link to='/logout'><AiOutlineLogout className='nav-icons' /></Link></li>}
                        {!currentUser && <li><Link to='/login'><AiOutlineLogin className='nav-icons' /></Link></li>}
                    </ul>
                </div>

            </nav>
        </>
    )
}

export default Navbar
