import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './components/Auth';
import Navbar from './components/Navbar/Navbar';

const Login = lazy(() => import('./components/Login/Login'));
const NewPost = lazy(() => import('./components/NewPost/NewPost'));
const Logout = lazy(() => import('./components/Logout'))

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <div className='container' style={{ paddingTop: '15px' }}>
            <Suspense fallback={<></>}>
              <Switch>
                <PublicRoute exact path='/login' restricted={true} component={Login} />
                <PrivateRoute exact path='/newpost' component={NewPost} />
                <PrivateRoute exact path='/logout' component={Logout} />
              </Switch>
            </Suspense>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
