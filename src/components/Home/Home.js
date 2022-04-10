import React, { useContext, lazy, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { AuthContext } from '../Auth'
import './home.css'
import PostCard from '../NewPost/PostCard'

const PrivateHome = lazy(() => import('./PrivateHome'));
const PublicHome = lazy(() => import('./PublicHome'));

const Home = () => {

    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.posts)
            setPosts(data.map((post, index) => <PostCard key={post.subsciption + index} post={post} />))
        } catch (err) { console.log(err) }
    }, [])

    return (
        <>
            <Helmet>
                <title>RentFlix - Home</title>
            </Helmet>
            {currentUser ? <PrivateHome /> : <PublicHome />}
            <div className='row mt-5'>
                {posts}
            </div>
        </>
    )
}

export default Home
