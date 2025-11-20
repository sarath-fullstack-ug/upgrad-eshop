import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import "./Footer.css";

const Footer = () => {
    return (
        <Box component="footer" sx={{ py: 3, textAlign: 'center', borderTop: '1px solid rgba(0,0,0,0.12)' }}>
            <Typography variant="body2">Copyright © {new Date().getFullYear()} upGrad E-Shop - All rights reserved</Typography>
        </Box>
    );
};

export default Footer;

