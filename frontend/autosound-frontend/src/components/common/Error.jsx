import { Alert, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Error = ({ message, retryFn }) => {
  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        {message || 'Ocurrió un error inesperado'}
      </Alert>
      {retryFn ? (
        <Button variant="contained" onClick={retryFn}>
          Reintentar
        </Button>
      ) : (
        <Button component={Link} to="/" variant="contained">
          Volver al inicio
        </Button>
      )}
    </Box>
  );
};

export default Error;