import { Card, CardMedia, CardContent, Typography, Button, CardActions, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.substring(0, 100)}...
        </Typography>
        {product.discount_price && (
          <Chip 
            label={`${Math.round((1 - product.discount_price / product.price) * 100)}% OFF`} 
            color="error" 
            size="small" 
            sx={{ mt: 1 }}
          />
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">
          {product.discount_price ? (
            <>
              <span style={{ textDecoration: 'line-through', color: 'gray', marginRight: '8px' }}>
                ${product.price}
              </span>
              <span style={{ color: 'red' }}>${product.discount_price}</span>
            </>
          ) : (
            `$${product.price}`
          )}
        </Typography>
        <Button 
          component={Link} 
          to={`/products/${product.slug}`} 
          size="small" 
          color="primary"
        >
          Ver detalles
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;