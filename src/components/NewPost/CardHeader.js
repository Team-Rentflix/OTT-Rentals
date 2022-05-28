import React, { useState, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import APICall from '../APICall'
import { bgColor } from '../../utils/constant'

const HeaderOffcanvas = React.lazy(() => import('./HeaderOffcanvas'))

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
            <Link to={`profile/${user_data.name}`} className='text-light d-flex' style={{ gap: '10px' }}>
                <img src={`https://ui-avatars.com/api/?name=${user_data.name}&size=40&background=${bgColor}&color=fff`} className='rounded-circle' alt='user_image' />
                <b>{user_data.name}</b>
            </Link>
            <div className='ms-auto d-flex align-items-center'>
                {user_id === localStorage.user_id && <Form.Check disabled={disable} onClick={ToggleActive} defaultChecked={active} type="switch" />}
                <Suspense fallback={<>Loading...</>}><HeaderOffcanvas user_data={user_data} getUserData={getUserData} post_id={post_id} user_id={user_id}/></Suspense>
            </div>
        </div>
    )
}

export default CardHeader