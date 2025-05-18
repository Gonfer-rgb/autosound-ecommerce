import { Box, Container } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <RegisterForm />
      </Box>
    </Container>
  );
};

export default RegisterPage;