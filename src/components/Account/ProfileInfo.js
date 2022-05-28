import React, { useEffect, useState } from 'react'
import { bgColor } from '../../utils/constant'

const ProfileInfo = ({ userData }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (userData) {
            setName(userData.name ? userData.name : '');
            setEmail(userData.email ? userData.email : '');
            setPhoneNumber(userData.phoneNumber ? userData.phoneNumber : '');
        }
    }, [userData]);

    return (
        <div className='col-md-4 text-light'>
            <div className='d-flex justify-content-md-start justify-content-center'>
                <img src={`https://ui-avatars.com/api/?name=${name}&size=200&background=${bgColor}&color=fff`} className='rounded-circle' alt='user_image' />
            </div>
            <h2 className='text-capitalize text-center text-md-start'>{name}</h2>
        </div>
    )
}

export default ProfileInfo
