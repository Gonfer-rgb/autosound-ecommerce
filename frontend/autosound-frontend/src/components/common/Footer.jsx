import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              AutoSound
            </Typography>
            <Typography variant="body2">
              Especialistas en accesorios y sonido para automóviles de alta calidad.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Enlaces Rápidos
            </Typography>
            <Box>
              <MuiLink component={Link} to="/products" color="inherit" display="block">
                Productos
              </MuiLink>
              <MuiLink component={Link} to="/about" color="inherit" display="block">
                Sobre Nosotros
              </MuiLink>
              <MuiLink component={Link} to="/contact" color="inherit" display="block">
                Contacto
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box>
              <MuiLink component={Link} to="/privacy" color="inherit" display="block">
                Política de Privacidad
              </MuiLink>
              <MuiLink component={Link} to="/terms" color="inherit" display="block">
                Términos y Condiciones
              </MuiLink>
              <MuiLink component={Link} to="/returns" color="inherit" display="block">
                Política de Devoluciones
              </MuiLink>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Síguenos
            </Typography>
            <Box>
              <MuiLink href="#" color="inherit" sx={{ mr: 1 }}>
                <Facebook />
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={{ mr: 1 }}>
                <Twitter />
              </MuiLink>
              <MuiLink href="#" color="inherit" sx={{ mr: 1 }}>
                <Instagram />
              </MuiLink>
              <MuiLink href="#" color="inherit">
                <LinkedIn />
              </MuiLink>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Suscríbete a nuestro boletín para ofertas exclusivas.
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} AutoSound. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;