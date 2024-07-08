import React from 'react';
import { Container, Grid, Box, Typography, Link } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import AdbIcon from '@mui/icons-material/Adb';

const Footer = () => {
  return (
      <Box sx={{ bgcolor: 'black', color: 'white', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
              <AdbIcon sx={{ display: { xs: 'none',color:"rgba(6, 108, 245, 0.79)",md: 'flex' }, mr: 1}} />
            <Typography variant="h6" gutterBottom  sx={{
                fontFamily: 'Lucida Console',
                fontWeight: 1000,
                color: '#007aff',
                textDecoration: 'none',
            }}>
              Notevault
            </Typography>
            <Typography variant="body2" color="inherit">
              Notevault offers a user-friendly interface that makes it simple and intuitive to take notes, organize your thoughts, and stay productive.
            </Typography>
          </Grid>
         
          <Grid item xs={22} sm={2}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <Link href="#" color="inherit" underline="none" display="block">Blog</Link>
            <Link href="#" color="inherit" underline="none" display="block">FAQs</Link>
            <Link href="#" color="inherit" underline="none" display="block">Support</Link>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" gutterBottom>
              Company
            </Typography>
            <Link href="#" color="inherit" underline="none" display="block">About Us</Link>
            <Link href="#" color="inherit" underline="none" display="block">Careers</Link>
            <Link href="#" color="inherit" underline="none" display="block">Contact</Link>
          </Grid>
         
          <Grid item xs={12} sm={4}>
            <div style={{marginLeft:"80px"}}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <Link href="https://www.facebook.com" color="inherit" target="_blank" sx={{ pr: 1 }}>
                <Facebook />
              </Link>
              <Link href="https://www.twitter.com" color="inherit" target="_blank" sx={{ pr: 1 }}>
                <Twitter />
              </Link>
              <Link href="https://www.linkedin.com" color="inherit" target="_blank" sx={{ pr: 1 }}>
                <LinkedIn />
              </Link>
              <Link href="https://www.instagram.com" color="inherit" target="_blank" sx={{ pr: 1 }}>
                <Instagram />
              </Link>
            </Box>
            </div>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={5}>
          <Typography variant="body2" color="inherit">
            &copy; {new Date().getFullYear()} Notevault. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
