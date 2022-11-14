import React from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import PostSection from './PostSection'
import Purchases from './Purchases'

const ContentSection = ({ userData, getUserData }) => {
    const { path,url } = useRouteMatch()
    return (
        <Switch>
            <Route path={path + '/posts'}><PostSection posts={userData?.posts} user_data={userData?.user} getUserData={getUserData} /></Route>
            <Route path={path + '/purchases'}><Purchases purchases={userData?.purchaseDetails}/></Route>
            <Route path={path}> <Redirect to={url + '/posts'} /></Route>
        </Switch>
    )
}

export default ContentSection
