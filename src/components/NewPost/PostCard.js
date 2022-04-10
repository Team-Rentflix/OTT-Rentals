import React, { useState } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Collapse } from 'react-bootstrap'
import Payment from '../Payment'
const PostCard = ({ post }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='col-12 col-md-4 p-2 fst-italic'>
            <div className='bg-white text-dark rounded-3 shadow-sm py-2 px-3'>
                <div className='d-flex align-items-center'>
                    <p className='fw-bold text-warning fs-3 mb-2'>BOOKING</p>
                    <p className='bg-success h-100 ms-3 rounded-pill py-1 px-3 text-light fw-bold mb-2'>OPEN</p>
                </div>
                <div className='row'>
                    <div className='col-6 mb-1'>
                        <b>Platform</b><br /><span>{post.platform}</span>
                    </div>
                    {/* <div className='col-6 mb-1'>
                    <b>Subscription Type</b><br/><span>{post.subscription_type}</span>
                </div> */}
                    <div className='col-6 mb-1 text-end'>
                        <b>Time Period</b><br /><span>{post.time_period}</span>
                    </div>
                    <div className='col-6 mb-1'>
                        <b>End Date</b><br /><span>{post.end_date}</span>
                    </div>
                    <div className='col-6 mb-1 text-end'>
                        <b>Amount</b><br /><span>₹{post.amount}</span>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <button onClick={() => setOpen(!open)} aria-expanded={open} className='btn fs-5 px-0'><BiMenuAltLeft /><span className='small px-1 fst-italic'>Details</span></button>
                    <Payment amount={post.amount}/>
                </div>
                <Collapse in={open}>
                    <div>
                        {post.description}
                    </div>
                </Collapse>
            </div>
        </div>
    )
}

export default PostCard