import { createContext, useState, useEffect } from 'react';
import axiosClient from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const u = localStorage.getItem('user');
        return u ? JSON.parse(u) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }, [user]);

    const signIn = async (credentials) => {
        // calls /auth as requested in your spec
        const resp = await axiosClient.post('/auth', credentials);
        // assuming resp.data = { token, user }
        const { token, user: userData } = resp.data;
        localStorage.setItem('token', token);
        setUser(userData);
        return userData;
    };

    const signUp = async (payload) => {
        // calls /users
        const resp = await axiosClient.post('/users', payload);
        return resp.data;
    };

    const signOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
