import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({
        user: null,
        token: null,
        role: null,
        storeId: null,
        isLoggedIn: false,
    });

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user_data');
            const storedToken = localStorage.getItem('token');
            const storedRole = localStorage.getItem('user_role');

            if (storedUser && storedToken && storedRole) {
                const user = JSON.parse(storedUser);
                setAuthData({
                    user: user,
                    token: storedToken,
                    role: storedRole,
                    storeId: user.storeId,
                    isLoggedIn: true,
                });
            }
        } catch (error) {
            console.error("Failed to parse auth data from localStorage", error);
        }
    }, []);
    
    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};