import { Box, useToast } from '@chakra-ui/react';
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute=({ children })=> {
    const toast = useToast();
    const isAuthenticated = localStorage.getItem('isAuth') === 'true';

    if (!isAuthenticated) {
        toast({
            position: "top",
            render: () => <Box id="un_success_toast">
                You Need to Login First</Box>,
            duration: 2000,
        });

        return <Navigate to="/login" replace />;
    }
    return children;
}

export default PrivateRoute;
