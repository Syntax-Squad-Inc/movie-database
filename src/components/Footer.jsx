import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        backgroundColor: '#2d0808', // Dark red background
        borderTop: '1px solid #d32f2f', // Red border
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#ff8a80' }}> {/* Light red text */}
            {new Date().getFullYear()} Movie Database. All rights reserved.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mt: { xs: 2, sm: 0 },
            }}
          >
            <Link 
              href="#" 
              sx={{ 
                color: '#ff8a80', 
                '&:hover': {
                  color: '#ff4444'
                }
              }} 
              underline="hover"
            >
              About
            </Link>
            <Link 
              href="#" 
              sx={{ 
                color: '#ff8a80', 
                '&:hover': {
                  color: '#ff4444'
                }
              }} 
              underline="hover"
            >
              Privacy Policy
            </Link>
            <Link 
              href="#" 
              sx={{ 
                color: '#ff8a80', 
                '&:hover': {
                  color: '#ff4444'
                }
              }} 
              underline="hover"
            >
              Terms of Use
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
