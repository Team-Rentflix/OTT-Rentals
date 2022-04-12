import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const CardHeader = ({ user_id, user_data }) => {
    return (
        <div className='d-flex' style={{ gap: '10px' }}>
            <img src={`https://ui-avatars.com/api/?name=${user_data.name}&size=40&background=C50707&color=fff`} className='rounded-circle' alt='user_image' />
            <b>{user_data.name}</b>
            <button className='btn ms-auto pe-0'><BsThreeDotsVertical/></button>
        </div>
    )
}

export default CardHeader