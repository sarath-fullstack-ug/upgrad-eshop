// src/components/search/Searchbar.jsx
import React, { useState, useRef } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

/**
 * Props:
 * - onSearch(query) => called when user submits (Enter or form submit)
 * - placeholder (optional)
 *
 * Usage:
 * <SearchBar onSearch={(q) => navigate(`/products?search=${encodeURIComponent(q)}`)} />
 */
export default function SearchBar({ onSearch = () => { }, placeholder = 'Search...' }) {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    const submit = (e) => {
        if (e) e.preventDefault();
        onSearch(query.trim());
    };

    return (
        <Box component="form" onSubmit={submit} role="search" aria-label="Search products" sx={{ width: '100%', maxWidth: 640 }}>
            <OutlinedInput
                fullWidth
                inputRef={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // avoid native submit double-run
                        submit();
                    }
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'rgba(255,255,255,0.85)' }} />
                    </InputAdornment>
                }
                sx={{
                    height: 44,
                    borderRadius: '10px',
                    background: (theme) => 'rgba(255,255,255,0.06)',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiInputBase-input': { color: 'rgba(255,255,255,0.95)', px: 1 },
                }}
                inputProps={{ 'aria-label': 'Search products' }}
            />
        </Box>
    );
}
