import React, { useEffect, useState } from "react";
import PropagateLoader from 'react-spinners/PropagateLoader'
import APICall from "./APICall";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [pending, setPending] = useState(true);

  useEffect(() => {

    const AuthenticateLogin = async () => {
      const data = await APICall('/api/auth', 'GET');
      if (data.status) {
        setCurrentUser(true);
        localStorage.username = data.username;
      }
      else {
        setCurrentUser(false);
      }
    }

    if (localStorage.ORIsLoggedIn === 'true') {
      setCurrentUser(true)
      AuthenticateLogin();
    }
    else {
      setCurrentUser(false);
    }
    setPending(false);
  }, []);



  if (pending) {
    return <div className='w-100 h-100 d-flex justify-content-center align-items-center' style={{
      minHeight: '100vh'
    }}>
      <PropagateLoader color='#C50707' loading={true} size={25} />
    </div>
  }

  const values = {
    currentUser,
    setCurrentUser
  }

  return (
    <AuthContext.Provider
      value={values}
    >
      {children}
    </AuthContext.Provider>
  )
};