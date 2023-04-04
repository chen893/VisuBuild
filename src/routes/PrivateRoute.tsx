import React from 'react'
import { Route, Navigate, type RouteProps } from 'react-router-dom'

const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
  const isAuthenticated = localStorage.getItem('token') !== null
  return isAuthenticated
    ? (
    <Route {...props} />
      )
    : (
    <Navigate to="/login" replace />
      )
}

export default PrivateRoute
