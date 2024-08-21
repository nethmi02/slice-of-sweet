import React from 'react';
import { Box, Typography, Link } from '@mui/material';
;

const Footer = () => {
  return (
    <Box sx={{ p: 2, mt: 'auto', textAlign: 'center', backgroundColor: '#f8f8f8' }}>
      <Typography variant="body1" sx={{ color: '#9b2226' }}>
        © 2024 Slice of Sweet. All rights reserved.
      </Typography>
      <Link href="/privacy-policy" sx={{ color: '#9b2226' }}>
        Privacy Policy
      </Link>
      <Link href="Bakers_dashboard/Baker" sx={{ color: '#9b2226', display: 'block', marginTop: '5px' }}>
        Baker Dashboard
      </Link>
    </Box>
  );
};

export default Footer;
