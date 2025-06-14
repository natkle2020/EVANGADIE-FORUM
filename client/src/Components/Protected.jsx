import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from './Context';

function Protected({ children }) {
  const [{ user }, dispatch] = useContext(Context);

  if (!user || user === null) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

export default Protected;
