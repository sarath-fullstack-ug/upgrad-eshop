// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import SearchBar from '../search/Searchbar';
import { AuthContext } from '../../common/context/AuthContext';

export default function Navbar() {
    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSearch = (query) => {
        if (query) navigate(`/products?search=${encodeURIComponent(query)}`);
        else navigate('/products');
    };

    const onLogout = () => {
        signOut?.();
        navigate('/');
    };

    // NavLink -> class helper (applies to MUI Button via component prop)
    const navClass = ({ isActive }) => (isActive ? 'nav-link-fluid active' : 'nav-link-fluid');

    return (
        <AppBar position="static" elevation={0} sx={{ bgcolor: '#3f51b5' }}>
            <Toolbar
                sx={{
                    minHeight: 56,
                    px: { xs: 1, sm: 2 },
                    display: 'flex',
                    gap: 2,
                }}
            >
                {/* LEFT: logo + site name */}
                <Box
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', mr: 1 }}
                    onClick={() => navigate('/')}
                    role="button"
                    tabIndex={0}
                >
                    <IconButton
                        size="small"
                        edge="start"
                        aria-label="home"
                        sx={{ color: 'white', mr: 1 }}
                    >
                        {/* inline svg icon (keeps original look) */}
                        <svg width="18" height="18" viewBox="0 0 24 24" className="logo-icon-fluid" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                            <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14l.84-2h7.45c.75 0 1.42-.41 1.75-1.03l2.56-5.12L20.41 5H6.21L5.27 3H1v2h2l3.6 7.59L6.25 15.04C6.09 15.36 6 15.69 6 16c0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.26-.09-.32-.22L7.16 14z" />
                        </svg>
                    </IconButton>

                    <Typography
                        variant="subtitle1"
                        noWrap
                        sx={{
                            color: 'white',
                            fontWeight: 600,
                            display: { xs: 'none', sm: 'inline-flex' }, // hide on very small screens if you want
                        }}
                    >
                        upGrad E-Shop
                    </Typography>
                </Box>

                {/* CENTER: fluid search area — expand to fill available space */}
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: 640, px: { xs: 1, sm: 2 } }}>
                        <SearchBar onSearch={handleSearch} placeholder="Search..." />
                    </Box>
                </Box>

                {/* RIGHT: nav links */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                    {/* Use MUI Button but let component be NavLink so routing + active class work */}
                    <Button
                        component={NavLink}
                        to="/"
                        end
                        className={navClass}
                        sx={{
                            color: alpha('#e6eaf6', 1),
                            textTransform: 'none',
                            fontSize: 13,
                            '&.active': { color: '#fff', fontWeight: 700, textDecoration: 'underline' },
                            '&:hover': { bgcolor: alpha('#ffffff', 0.04) },
                        }}
                    >
                        Home
                    </Button>

                    {user?.role === 'admin' && (
                        <Button
                            component={NavLink}
                            to="/add-product"
                            className={navClass}
                            sx={{
                                color: alpha('#e6eaf6', 1),
                                textTransform: 'none',
                                fontSize: 13,
                                '&.active': { color: '#fff', fontWeight: 700, textDecoration: 'underline' },
                                '&:hover': { bgcolor: alpha('#ffffff', 0.04) },
                            }}
                        >
                            Add Product
                        </Button>
                    )}

                    {!user ? (
                        <>
                            <Button
                                component={NavLink}
                                to="/login"
                                className={navClass}
                                sx={{
                                    color: alpha('#e6eaf6', 1),
                                    textTransform: 'none',
                                    fontSize: 13,
                                    '&.active': { color: '#fff', fontWeight: 700, textDecoration: 'underline' },
                                    '&:hover': { bgcolor: alpha('#ffffff', 0.04) },
                                }}
                            >
                                Login
                            </Button>

                            <Button
                                component={NavLink}
                                to="/signup"
                                className={navClass}
                                sx={{
                                    color: alpha('#e6eaf6', 1),
                                    textTransform: 'none',
                                    fontSize: 13,
                                    '&.active': { color: '#fff', fontWeight: 700, textDecoration: 'underline' },
                                    '&:hover': { bgcolor: alpha('#ffffff', 0.04) },
                                }}
                            >
                                Signup
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                component={NavLink}
                                to="/cart"
                                className={navClass}
                                sx={{
                                    color: alpha('#e6eaf6', 1),
                                    textTransform: 'none',
                                    fontSize: 13,
                                    '&.active': { color: '#fff', fontWeight: 700, textDecoration: 'underline' },
                                    '&:hover': { bgcolor: alpha('#ffffff', 0.04) },
                                }}
                            >
                                Cart
                            </Button>

                            {/* Logout: MUI Button styled red */}
                            <Button
                                onClick={onLogout}
                                variant="contained"
                                sx={{
                                    bgcolor: '#d32f2f',
                                    color: '#fff',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    '&:hover': { bgcolor: '#b62828' },
                                }}
                            >
                                LOGOUT
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
