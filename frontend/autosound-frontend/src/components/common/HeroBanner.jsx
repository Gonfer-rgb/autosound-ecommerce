import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const HeroBanner = ({ title, subtitle, imageUrl, ctaText, ctaLink }) => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        py: 10,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
          {subtitle}
        </Typography>
        <Button 
          component={Link} 
          to={ctaLink} 
          variant="contained" 
          size="large" 
          color="primary"
          sx={{ px: 4, py: 2 }}
        >
          {ctaText}
        </Button>
      </Container>
    </Box>
  );
};

export default HeroBanner;