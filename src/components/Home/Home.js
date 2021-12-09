import React, { useContext, lazy } from 'react'
import { Helmet } from 'react-helmet'
import { AuthContext } from '../Auth'
import './home.css'

const PrivateHome = lazy(() => import('./PrivateHome'));
const PublicHome = lazy(() => import('./PublicHome'));

const Home = () => {

    const currentUser = useContext(AuthContext);

    return (
        <>
            <Helmet>
                <title>RentFlix - Home</title>
            </Helmet>
            {currentUser ? <PrivateHome /> : <PublicHome />}
        </>
    )
}

export default Home
