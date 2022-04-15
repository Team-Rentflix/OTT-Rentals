import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import APICall from '../APICall'

const CardHeader = ({ user_id, user_data, active, getUserData, post_id }) => {
    const [disable, setDisable] = useState(false)

    const ToggleActive = async () => {
        setDisable(true)
        const data = await APICall(`/api/post/${post_id}`, 'PATCH', { active: !active })
        if (data.status) {
            await getUserData()
            setDisable(false)
        }
    }

    return (
        <div className='d-flex'>
            <Link to={`profile/${user_data.name}`} className='text-dark d-flex' style={{ gap: '10px' }}>
                <img src={`https://ui-avatars.com/api/?name=${user_data.name}&size=40&background=C50707&color=fff`} className='rounded-circle' alt='user_image' />
                <b>{user_data.name}</b>
            </Link>
            <div className='ms-auto d-flex align-items-center'>
                {user_id === localStorage.user_id && <Form.Check disabled={disable} onClick={ToggleActive} defaultChecked={active} type="switch" />}
                <button className='btn pe-0'><BsThreeDotsVertical /></button>
            </div>
        </div>
    )
}

export default CardHeader