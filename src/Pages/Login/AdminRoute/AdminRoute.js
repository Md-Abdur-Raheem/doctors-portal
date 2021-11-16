import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const AdminRoute = ({children,...rest}) => {
  const { user, loading, admin } = useAuth();
  const location = useLocation();
    if (loading) {
        return <Box
                sx={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "25%" }}>
                    <CircularProgress />
                </Box>
    }
  if (user.email && admin) {
    return children;
  }
  return <Navigate to={location} state={{ from: location }} />;
};

export default AdminRoute;