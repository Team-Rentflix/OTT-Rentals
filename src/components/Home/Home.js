import React, { useContext, lazy, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { AuthContext } from '../Auth'
import './home.css'
import PostCard from '../NewPost/PostCard'
import APICall from '../APICall'

const PrivateHome = lazy(() => import('./PrivateHome'));
const PublicHome = lazy(() => import('./PublicHome'));

const Home = () => {

    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState(null)

    const getPosts = async () => {
        const data = await APICall('/api/posts', 'GET')
        if (data.status) setPosts(data.posts)
    }
    useEffect(() => {
        getPosts();
    }, [])

    return (
        <>
            <Helmet>
                <title>RentFlix - Home</title>
            </Helmet>
            {currentUser ? <PrivateHome /> : <PublicHome />}
            <div className='row mt-5 justify-content-center'>
                {posts && posts.map((post,index) => <PostCard getUserData={getPosts} key={post._id + index} post={post} classes='col-md-4'/>)}
            </div>
        </>
    )
}

export default Home
