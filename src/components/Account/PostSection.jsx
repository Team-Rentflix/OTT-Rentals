import PostCard from '../NewPost/PostCard'

const PostSection = ({posts,user_data,getUserData}) => {
    return (
        <div className=' rounded-3 col mt-4 mt-md-0 row p-0 mx-auto'>
            {posts && posts.map((post, index) => {
                post = { ...post, user_data }
                return <PostCard key={post._id + index} post={post} getUserData={getUserData} classes='col-md-6' />
            })}
        </div>
    )
}

export default PostSection