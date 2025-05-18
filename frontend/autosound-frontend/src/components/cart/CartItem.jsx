import { Box, Typography, IconButton, TextField, Divider, Button } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateCartItem, removeFromCart } from '../../features/cart/cartSlice';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0 && newQuantity <= item.product.stock) {
      dispatch(updateCartItem({
        productId: item.product.id,
        quantity: newQuantity
      }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.product.id));
  };

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        <Box 
          component={Link} 
          to={`/products/${item.product.slug}`}
          sx={{ 
            width: 100, 
            height: 100, 
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
            borderRadius: 1,
            overflow: 'hidden'
          }}
        >
          <img 
            src={item.product.image} 
            alt={item.product.name} 
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </Box>
        
        <Box flexGrow={1}>
          <Typography 
            variant="subtitle1" 
            component={Link} 
            to={`/products/${item.product.slug}`}
            sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' } }}
          >
            {item.product.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            {item.product.brand?.name}
          </Typography>
          
          <Box display="flex" alignItems="center" mt={1}>
            <IconButton 
              size="small" 
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Remove fontSize="small" />
            </IconButton>
            
            <TextField
              value={item.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              type="number"
              size="small"
              sx={{ 
                width: 60,
                '& .MuiInputBase-input': { 
                  textAlign: 'center',
                  py: 0.5,
                  '-moz-appearance': 'textfield',
                  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                    '-webkit-appearance': 'none',
                    margin: 0,
                  },
                }
              }}
              inputProps={{ min: 1, max: item.product.stock }}
            />
            
            <IconButton 
              size="small" 
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
            >
              <Add fontSize="small" />
            </IconButton>
            
            <Typography variant="body2" sx={{ ml: 'auto' }}>
              {item.product.discount_price ? (
                <>
                  <span style={{ textDecoration: 'line-through', color: 'text.disabled', marginRight: '4px' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  <span style={{ color: 'error.main' }}>
                    ${(item.product.discount_price * item.quantity).toFixed(2)}
                  </span>
                </>
              ) : (
                `$${(item.product.price * item.quantity).toFixed(2)}`
              )}
            </Typography>
          </Box>
        </Box>
        
        <IconButton onClick={handleRemove} color="error">
          <Delete />
        </IconButton>
      </Box>
      <Divider />
    </Box>
  );
};

export default CartItem;