import React, { useEffect, useState } from 'react'

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
        <div className='col-md-4'>
            <div className='d-flex justify-content-center'>
                <img src={`https://ui-avatars.com/api/?name=${name}&size=200&background=C50707&color=fff`} className='rounded-circle' alt='user_image' />
            </div>
        </div>
    )
}

export default ProfileInfo
