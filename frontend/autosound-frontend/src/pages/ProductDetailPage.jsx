import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Grid, Button, Rating, Divider, Tabs, Tab, Chip, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductBySlug, createProductReview } from '../features/products/productsThunks';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import { addToCart } from '../features/cart/cartSlice';
import ProductImageGallery from '../components/products/ProductImageGallery';
import ReviewForm from '../components/products/ReviewForm';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { product, loading, error, reviewLoading, reviewError } = useSelector(state => state.products);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    dispatch(fetchProductBySlug(slug));
  }, [dispatch, slug]);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && review.trim()) {
      dispatch(createProductReview({ slug, rating, comment: review }));
      setRating(0);
      setReview('');
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!product) return <Error message="Producto no encontrado" />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ProductImageGallery product={product} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={product.average_rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews?.length || 0} reseñas)
            </Typography>
          </Box>
          
          {product.brand && (
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="body2" sx={{ mr: 1 }}>Marca:</Typography>
              <Chip 
                avatar={<Avatar src={product.brand.logo} alt={product.brand.name} />}
                label={product.brand.name}
                variant="outlined"
                size="small"
              />
            </Box>
          )}
          
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            {product.discount_price ? (
              <>
                <span style={{ textDecoration: 'line-through', color: 'text.disabled', marginRight: '8px' }}>
                  ${product.price}
                </span>
                <span style={{ color: 'error.main' }}>
                  ${product.discount_price}
                </span>
                <Chip 
                  label={`${Math.round((1 - product.discount_price / product.price) * 100)}% OFF`} 
                  color="error" 
                  size="small" 
                  sx={{ ml: 1 }}
                />
              </>
            ) : (
              `$${product.price}`
            )}
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            {product.description}
          </Typography>
          
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Disponibilidad: 
              <Typography 
                component="span" 
                color={product.stock > 0 ? 'success.main' : 'error.main'}
                sx={{ ml: 1 }}
              >
                {product.stock > 0 ? 'En stock' : 'Agotado'}
              </Typography>
            </Typography>
            
            {product.stock > 0 && (
              <Typography variant="body2" color="text.secondary">
                {product.stock} unidades disponibles
              </Typography>
            )}
          </Box>
          
          {product.stock > 0 && (
            <Box sx={{ mb: 3 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="body1" sx={{ mr: 2 }}>Cantidad:</Typography>
                <Box display="flex" alignItems="center">
                  <Button 
                    variant="outlined" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                  <Button 
                    variant="outlined" 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                </Box>
              </Box>
              
              <Button 
                variant="contained" 
                size="large" 
                fullWidth
                onClick={handleAddToCart}
                sx={{ mb: 2 }}
              >
                Añadir al Carrito
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
      
      <Box sx={{ my: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab label="Descripción" />
          <Tab label="Especificaciones" />
          <Tab label={`Reseñas (${product.reviews?.length || 0})`} />
        </Tabs>
        
        <Divider />
        
        {tabValue === 0 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
          </Box>
        )}
        
        {tabValue === 1 && (
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {Object.entries(product.features).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {key.replace(/_/g, ' ').toUpperCase()}
                  </Typography>
                  <Typography variant="body1">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        
        {tabValue === 2 && (
          <Box sx={{ p: 2 }}>
            {product.reviews?.length > 0 ? (
              <Box>
                {product.reviews.map((review) => (
                  <Box key={review.id} sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Avatar sx={{ mr: 1 }}>
                        {review.user.email.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="subtitle1" sx={{ mr: 2 }}>
                        {review.user.email}
                      </Typography>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(review.created_at).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ mt: 1 }}>
                      {review.comment}
                    </Typography>
                    <Divider />
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No hay reseñas aún. Sé el primero en opinar sobre este producto.
              </Typography>
            )}
            
            {isAuthenticated && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Escribe una reseña
                </Typography>
                <ReviewForm 
                  rating={rating}
                  review={review}
                  setRating={setRating}
                  setReview={setReview}
                  onSubmit={handleReviewSubmit}
                  loading={reviewLoading}
                  error={reviewError}
                />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProductDetailPage;