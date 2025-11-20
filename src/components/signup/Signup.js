import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import axiosClient from '../../common/api';
import { AuthContext } from '../../common/context/AuthContext';

export default function Signup() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        contactNumber: ''
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // small font size used across inputs (px)
    const inputFontSize = 14;

    const validate = () => {
        const e = {};
        if (!form.firstName.trim()) e.firstName = 'First name is required';
        if (!form.lastName.trim()) e.lastName = 'Last name is required';
        if (!form.email) e.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.password) e.password = 'Password is required';
        else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
        if (!form.confirmPassword) e.confirmPassword = 'Confirm your password';
        else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
        if (!form.contactNumber) e.contactNumber = 'Contact number is required';
        else if (!/^\+?[0-9]{7,15}$/.test(form.contactNumber.replace(/\s+/g, ''))) {
            e.contactNumber = 'Enter a valid contact number';
        }
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
            if (auth?.signUp) {
                await auth.signUp({
                    name: `${form.firstName.trim()} ${form.lastName.trim()}`,
                    email: form.email.trim(),
                    password: form.password,
                    contactNumber: form.contactNumber.trim()
                });
            } else {
                const payload = {
                    firstName: form.firstName.trim(),
                    lastName: form.lastName.trim(),
                    email: form.email.trim(),
                    password: form.password,
                    contactNumber: form.contactNumber.trim()
                };
                const resp = await axiosClient.post('/users', payload);
                if (!resp || (resp.status && resp.status >= 400)) {
                    throw new Error('Signup failed');
                }
            }

            // On success, navigate to login
            navigate('/login', { replace: true });
        } catch (err) {
            console.error(err);
            const msg = err?.response?.data?.message || 'Sign up failed. Please try again.';
            setServerError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#ff2d7f', width: 56, height: 56, mb: 1 }}>
                    <LockIcon sx={{ color: '#fff' }} />
                </Avatar>

                <Typography component="h1" variant="h6" sx={{ mb: 2 }}>
                    Sign up
                </Typography>

                {serverError && (
                    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                        {serverError}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }} noValidate>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        disabled={loading}
                        autoComplete="given-name"
                        sx={{ '& .MuiInputBase-input': { fontSize: inputFontSize } }}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        disabled={loading}
                        autoComplete="family-name"
                        sx={{ '& .MuiInputBase-input': { fontSize: inputFontSize } }}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        name="email"
                        label="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={loading}
                        autoComplete="email"
                        sx={{ '& .MuiInputBase-input': { fontSize: inputFontSize } }}
                    />

                    {/* Password */}
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
                            sx={{ '& .MuiInputBase-input': { fontSize: inputFontSize } }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        onClick={() => setShowPassword(s => !s)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{ autoComplete: 'new-password' }}
                        />

                        {errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                    </FormControl>

                    {/* Confirm Password */}
                    <FormControl variant="outlined" fullWidth margin="normal" error={!!errors.confirmPassword}>
                        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>

                        <OutlinedInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            disabled={loading}
                            label="Confirm Password"
                            sx={{ '& .MuiInputBase-input': { fontSize: inputFontSize } }}
                            inputProps={{ autoComplete: 'new-password' }}
                        />

                        {errors.confirmPassword && <FormHelperText>{errors.confirmPassword}</FormHelperText>}
                    </FormControl>

                    <TextField
                        margin="normal"
                        fullWidth
                        id="contactNumber"
                        name="contactNumber"
                        label="Contact Number"
                        value={form.contactNumber}
                        onChange={handleChange}
                        error={!!errors.contactNumber}
                        helperText={errors.contactNumber}
                        disabled={loading}
                        autoComplete="tel"
                        sx={{ '& .MuiInputBase-input': { fontSize: inputFontSize } }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, py: 1.25, bgcolor: '#3f51b5', fontSize: 14 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : 'SIGN UP'}
                    </Button>

                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Link component={RouterLink} to="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}
