import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '../features/products/productsThunks';
import ProductCard from '../components/products/ProductCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/common/HeroBanner';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featuredProducts, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Box>
      <HeroBanner 
        title="Bienvenido a AutoSound"
        subtitle="Los mejores accesorios y sistemas de sonido para tu auto"
        imageUrl="/images/hero-banner.jpg"
        ctaText="Explorar Productos"
        ctaLink="/products"
      />
      
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Productos Destacados
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        
        <Box textAlign="center" mt={4}>
          <Button 
            variant="contained" 
            size="large" 
            component={Link} 
            to="/products"
          >
            Ver Todos los Productos
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;