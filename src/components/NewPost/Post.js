import React, { useEffect, useState } from 'react'
import APICall from '../APICall'
import { useParams } from 'react-router-dom'
import PostCard from './PostCard'
const Post = () => {
    const { post_id } = useParams()
    const [post, setPost] = useState(null);

    const getPostData = async () => {
        const data = await APICall(`/api/post/${post_id}`, 'GET');
        if (data.status) {
            setPost(data.post)
        }
    }

    useEffect(() => {
        getPostData();
    }, [])

    return (
        <div className='d-flex align-items-center justify-content-center'>
            {post && <PostCard post={post} classes='col-md-6' getUserData={getPostData} />}
        </div>
    )
}

export default Post