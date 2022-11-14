import React, { lazy, Suspense, useEffect, useState } from 'react'
import APICall from '../APICall'
import { Helmet } from 'react-helmet'
const ProfileInfo = lazy(() => import('./ProfileInfo'))
const ContentSection = lazy(() => import('./ContentSection'))


const Account = () => {

    const [userData, setUserData] = useState(null);
    const navlist = [{ title: "Posts", link: 'posts' },{title:'Purchases',link:'purchases'}]

    const getUserData = async () => {
        const data = await APICall('/api/account', 'GET');
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
                <title>RentFlix - {localStorage.username}</title>
            </Helmet>
            <div className='row'>
                <Suspense fallback={<>Loading...</>}>
                    <ProfileInfo userData={userData?.user} isAccount={true} navlist={navlist}/>
                    <ContentSection getUserData={getUserData} userData={userData} />
                </Suspense>
            </div>
        </>
    )
}

export default Account
