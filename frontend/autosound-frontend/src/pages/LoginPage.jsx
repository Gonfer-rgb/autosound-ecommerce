import { Box, Container } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;