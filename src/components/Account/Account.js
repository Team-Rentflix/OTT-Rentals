import React, { lazy, Suspense, useEffect, useState } from 'react'
import APICall from '../APICall'

const ProfileInfo = lazy(() => import('./ProfileInfo'))
const ContentSection = lazy(() => import('./ContentSection'))

const Account = () => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            setUserData(await APICall('/api/account', 'GET'))
        }

        getUserData();
    }, [])

    return (
        <>
            <div className='row'>
                <Suspense fallback={<>Loading...</>}>
                    <ProfileInfo userData={userData} />
                    <ContentSection userData={userData} />
                </Suspense>
            </div>

        </>
    )
}

export default Account
