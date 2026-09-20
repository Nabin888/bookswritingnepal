import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState('checking'); // checking | ok | invalid

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setStatus('invalid');
      return;
    }
    fetch(`${API_BASE_URL}/api/admin/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? setStatus('ok') : setStatus('invalid')))
      .catch(() => setStatus('invalid'));
  }, []);

  if (status === 'checking') {
    return <p className="text-center py-20 text-gray-500">Checking session...</p>;
  }

  if (status === 'invalid') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
