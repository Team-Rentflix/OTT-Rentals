import { BsThreeDotsVertical } from 'react-icons/bs'
import React, { useEffect, useState } from 'react'
import { Offcanvas } from 'react-bootstrap'
import { BsWhatsapp, BsFillPenFill } from 'react-icons/bs'
import { HiOutlineMail } from 'react-icons/hi'
import APICall from '../APICall'

const HeaderOffcanvas = ({ user_data, getUserData, post_id, user_id }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [copy, setcopy] = useState(false);

    useEffect(() => {
        if (copy) {
            setTimeout(() => {
                setcopy(false)
            }, 3000)
        }
    }, [copy])

    const DeletePost = async () => {
        const data = await APICall(`/api/post/${post_id}`, 'DELETE');
        if (data.status) {
            await getUserData()
        }
    }

    const messageBody = `Hey Checkout this posting on Rentflix`
    const bodyLink = `https://rentflix-app.netlify.app/post/${post_id}`

    return (
        <>
            <button onClick={handleShow} className='btn pe-0'><BsThreeDotsVertical className='text-white'/></button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Body>
                    <div className='d-flex flex-column'>
                        {user_id === localStorage.user_id && <button onClick={DeletePost} className='btn border-bottom fw-bold text-danger'>Delete</button>}
                        <button onClick={handleClose} className='btn border-bottom text-light'>Cancel</button>
                    </div>
                    <div className='mt-4'>
                        <h4 className='text-secondary text-uppercase letter-spacing-2'>Contact</h4>
                        <div className='flex-gap-1 header-icons align-items-center'>
                            <a href={`whatsapp://send/?phone=%2091${user_data.phoneNumber}`} className='fs-4' target='_blank'><BsWhatsapp className='text-success' /></a>
                            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user_data.email}`} className='fs-3' target='_blank'><HiOutlineMail className='text-danger' /></a>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h4 className='text-secondary text-uppercase letter-spacing-2'>share post</h4>
                        <div className='d-flex flex-column align-items-start text-secondary'>
                            <a href={`whatsapp://send/?text=${messageBody + ' ' + bodyLink}`} target='_blank' className='btn text-secondary'><BsWhatsapp /> Share on WhatsApp</a>
                            <a href={`https://mail.google.com/mail/?view=cm&fs=1&body=${messageBody + ' ' + bodyLink}`} target='_blank' className='btn text-secondary'><HiOutlineMail /> Share by Email</a>
                            <button className={`btn ${copy ? 'text-success' : 'text-secondary'}`} onClick={() => {
                                navigator.clipboard.writeText(bodyLink);
                                setcopy(true)
                            }}><BsFillPenFill />&nbsp;{copy ? 'Link Copied' : 'Copy Link'}</button>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default HeaderOffcanvas