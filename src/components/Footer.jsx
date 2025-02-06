import { Box, Container, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'transparent',
        color: '#ff8a80',
        py: 3, // Adjust or remove padding
        mt: 'auto', // This pushes the footer to the bottom, remove if not needed
        width: '100%',
        position: 'relative',
        bottom: 0,
        left: 0,
        right: 0,
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
