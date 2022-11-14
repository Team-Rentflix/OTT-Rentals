import React, { lazy, Suspense, useEffect, useState } from 'react'
import APICall from '../APICall'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const ProfileInfo = lazy(() => import('./ProfileInfo'))
const ContentSection = lazy(() => import('./ContentSection'))

const Profile = () => {
    const { username } = useParams()
    const navlist = [{ title: "Posts", link: 'posts' }]

    const [userData, setUserData] = useState(null);
    
    const getUserData = async () => {
        const data = await APICall(`/api/profile/${username}`, 'GET');
        if (data.status) {
            setUserData(data.user)
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <>
            <Helmet>
                <title>RentFlix - {username}</title>
            </Helmet>
            <div className='row'>
                <Suspense fallback={<>Loading...</>}>
                    <ProfileInfo userData={userData?.user} navlist={navlist}/>
                    <ContentSection getUserData={getUserData} posts={userData?.posts} user_data={userData?.user} />
                </Suspense>
            </div>
        </>
    )
}

export default Profile
