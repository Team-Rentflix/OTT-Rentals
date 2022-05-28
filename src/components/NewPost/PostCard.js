import React, { useState, useEffect } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Collapse } from 'react-bootstrap'
import Payment from '../Payment'
import CardHeader from './CardHeader'
import './card.css'
const PostCard = ({ post, classes, getUserData }) => {
    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState(0)
    useEffect(() => {
        const end_date = new Date(post.end_date)
        const today = new Date()
        const diffTime = Math.abs(end_date - today);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        let amt;
        if (diffDays >= post.time_period) {
            amt = post.rate * post.time_period
        } else {
            amt = post.rate * diffDays
        }
        setAmount(amt)
    }, [])
    return (
        <div className={`col-12 ${classes} p-2 fst-italic`}>
            <div className='glassmorphism text-light rounded-3 shadow-sm py-2 px-3'>
                <CardHeader getUserData={getUserData} post_id={post._id} user_id={post.user_id} user_data={post.user_data} active={post.active} />
                <div className='d-flex align-items-center'>
                    <p className='fw-bold text-warning text-uppercase fs-3 mb-2'>{post.subscription_type}</p>
                    <p className={`bg-${post.active?'success':'danger'} h-100 ms-3 rounded-pill py-1 px-3 text-light fw-bold mb-2`}>{post.active?"OPEN":"CLOSED"}</p>
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
                        <b>End Date</b><br /><span>{new Date(post.end_date).toLocaleDateString()}</span>
                    </div>
                    <div className='col-6 mb-1 text-end'>
                        <b>Amount</b><br /><span>₹{amount}</span>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <button onClick={() => setOpen(!open)} aria-expanded={open} className='btn fs-5 px-0'><BiMenuAltLeft className='text-light'/><span className='small px-1 fst-italic text-light'>Details</span></button>
                    <Payment amount={amount} user_id={post.user_id} />
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