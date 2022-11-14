import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import PostSection from './PostSection'

const ContentSection = ({ posts, user_data, getUserData }) => {
    const { path,url } = useRouteMatch()
    return (
        <Switch>
            <Route path={path + '/posts'}><PostSection posts={posts} user_data={user_data} getUserData={getUserData} /></Route>
            <Route path={path}> <Redirect to={url + '/posts'} /></Route>
        </Switch>
    )
}

export default ContentSection
