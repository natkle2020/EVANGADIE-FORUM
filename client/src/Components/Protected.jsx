import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from './Context';
import { Spinner } from 'react-bootstrap';

function Protected({ children }) {
  const [{user, loading}] = useContext(Context);
   if (loading) {
  
     return <Spinner animation="border" variant="success" size="lg" role="status">Loading...</Spinner>
  }

  if (!user || user === null) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default Protected;

