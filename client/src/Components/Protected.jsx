import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from './Context';
import { Spinner } from 'react-bootstrap';

function Protected({ children }) {
  const [{user, loading}] = useContext(Context);

  // Checking if still localStorage token is there
  const token = localStorage.getItem('token');


   if (loading) {
  
     return <Spinner animation="border" variant="success" size="lg" role="status">Loading...</Spinner>
  }

  if (!user || !token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default Protected;

