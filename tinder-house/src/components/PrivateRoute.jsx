import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Contexts/authContext'

function PrivateRoute({children}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/Login"/>
  }
  return children;
  
}

export default PrivateRoute;
