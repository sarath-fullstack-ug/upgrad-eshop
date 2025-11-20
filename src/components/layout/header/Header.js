import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./Header.css";

const Header = () => {
    return (
        <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h3">Welcome to uc Eshop</Typography>
            <Typography variant="subtitle1">Best place to buy stuff</Typography>
        </Box>
    );
};

export default Header;



