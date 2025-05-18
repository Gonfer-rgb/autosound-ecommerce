import { Container, Box, Typography, Button, Grid, Divider, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/cart/CartItem';
import { clearCart } from '../features/cart/cartSlice';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discount_price || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const tax = subtotal * 0.16; // 16% IVA
  const shipping = subtotal > 1000 ? 0 : 100; // Free shipping over $1000
  const total = subtotal + tax + shipping;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tu Carrito de Compras
      </Typography>
      
      {items.length === 0 ? (
        <Box textAlign="center" py={6}>
          <Typography variant="h6" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Button 
            component={Link} 
            to="/products" 
            variant="contained" 
            size="large"
          >
            Continuar Comprando
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 2 }}>
              <Button 
                onClick={handleClearCart} 
                color="error" 
                size="small"
              >
                Vaciar Carrito
              </Button>
            </Box>
            
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Resumen de Compra
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Subtotal:</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Envío:</Typography>
                  <Typography>
                    {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Impuestos (16%):</Typography>
                  <Typography>${tax.toFixed(2)}</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box display="flex" justifyContent="space-between" mb={3}>
                  <Typography variant="subtitle1">Total:</Typography>
                  <Typography variant="subtitle1">
                    <strong>${total.toFixed(2)}</strong>
                  </Typography>
                </Box>
                
                <Button
                  component={Link}
                  to={isAuthenticated ? "/checkout" : "/login?redirect=/checkout"}
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Proceder al Pago
                </Button>
              </Box>
              
              <Typography variant="body2" color="text.secondary">
                * El envío gratuito aplica en compras mayores a $1000
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage;