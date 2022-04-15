import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './components/Auth';
import Navbar from './components/Navbar/Navbar';

const Login = lazy(() => import('./components/Login/Login'));
const NewPost = lazy(() => import('./components/NewPost/NewPost'));
const Logout = lazy(() => import('./components/Logout'));
const Buy = lazy(() => import('./components/Buy/Buy'));
const Home = lazy(() => import('./components/Home/Home'));
const Account = lazy(() => import('./components/Account/Account'))
const Profile = lazy(() => import('./components/Account/Profile'))

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <div className='container' style={{
            paddingBottom: '90px'
          }}>
            <Suspense fallback={<>Loading</>}>
              <Switch>
                <Route path='/home' component={Home} />
                <PublicRoute exact path='/login' restricted={true} component={Login} />
                <PrivateRoute exact path='/newpost' component={NewPost} />
                <PrivateRoute exact path='/logout' component={Logout} />
                <PrivateRoute path='/rent-now' component={Buy} />
                <PrivateRoute path='/account' component={Account} />
                <PublicRoute path='/profile/:username' component={Profile} />
                <Route>
                  <Redirect to='/home' />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
