import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message }) => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      minHeight="60vh"
    >
      <CircularProgress size={60} thickness={4} sx={{ mb: 3 }} />
      <Typography variant="h6" color="textSecondary">
        {message || 'Cargando...'}
      </Typography>
    </Box>
  );
};

export default Loading;