import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const PrivateRoute = ({children,...rest}) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <Box
                sx={{ display: 'flex', justifyContent: "center", alignItems: "center", marginTop: "25%" }}>
                    <CircularProgress />
                </Box>
    }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;