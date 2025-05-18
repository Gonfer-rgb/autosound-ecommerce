import { Box, TextField, Button, Rating, Typography, Alert } from '@mui/material';
import { useState } from 'react';

const ReviewForm = ({ rating, review, setRating, setReview, onSubmit, loading, error }) => {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <Box mb={2}>
        <Typography component="legend">Calificación</Typography>
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          precision={0.5}
          size="large"
        />
      </Box>
      
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="Tu reseña"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        margin="normal"
      />
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading || !rating || !review.trim()}
        sx={{ mt: 2 }}
      >
        {loading ? 'Enviando...' : 'Enviar Reseña'}
      </Button>
    </Box>
  );
};

export default ReviewForm;