import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import axiosClient from '../../common/api';
import { AuthContext } from '../../common/context/AuthContext';

export default function Login() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const returnTo = new URLSearchParams(location.search).get('redirect') || '/products';

    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // small font size used across inputs (px)
    const inputFontSize = 14;

    const validate = () => {
        const e = {};
        if (!form.email) e.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.password) e.password = 'Password is required';
        else if (form.password.length < 4) e.password = 'Password must be at least 4 characters';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: undefined }));
        setServerError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        if (!validate()) return;

        setLoading(true);
        try {
            if (auth?.signIn) {
                await auth.signIn({ email: form.email.trim(), password: form.password });
            } else {
                const resp = await axiosClient.post('/auth', { email: form.email.trim(), password: form.password });
                const { token, user } = resp.data || {};
                if (token) localStorage.setItem('token', token);
                if (user) localStorage.setItem('user', JSON.stringify(user));
            }
            navigate(returnTo, { replace: true });
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.message || 'Sign in failed. Please check credentials and try again.';
            setServerError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#ff2d7f', width: 56, height: 56, mb: 1 }}>
                    <LockIcon sx={{ color: '#fff' }} />
                </Avatar>

                <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
                    Sign in
                </Typography>

                {serverError && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {serverError}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }} noValidate>
                    {/* Email - using TextField but with smaller font */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        label="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        autoFocus
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={loading}
                        sx={{
                            '& .MuiInputBase-input': { fontSize: inputFontSize },
                        }}
                    />

                    {/* Password - using FormControl + OutlinedInput (no InputProps) */}
                    <FormControl variant="outlined" fullWidth margin="normal" error={!!errors.password}>
                        <InputLabel htmlFor="password">Password</InputLabel>

                        <OutlinedInput
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={form.password}
                            onChange={handleChange}
                            disabled={loading}
                            label="Password"
                            sx={{
                                '& .MuiInputBase-input': { fontSize: inputFontSize },
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        onClick={() => setShowPassword(p => !p)}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{ autoComplete: 'current-password' }}
                        />

                        {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, py: 1.25, bgcolor: '#3f51b5', fontSize: 14 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : 'SIGN IN'}
                    </Button>

                    <Box sx={{ mt: 2, textAlign: 'left' }}>
                        <Link component={RouterLink} to="/signup" variant="body2">
                            Don't have an account? Sign Up
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
