import React, { useEffect, useState } from "react";
import PropagateLoader from 'react-spinners/PropagateLoader'
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);


  useEffect(() => {
    if (localStorage.ORIsLoggedIn === 'true') {
      setCurrentUser(true);
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

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};