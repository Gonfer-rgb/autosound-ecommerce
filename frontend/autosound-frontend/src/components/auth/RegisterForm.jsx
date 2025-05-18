import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Alert,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { register } from '../../features/auth/authThunks';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Requerido'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('Requerido'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Requerido'),
    first_name: Yup.string().required('Requerido'),
    last_name: Yup.string().required('Requerido'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password2: '',
      first_name: '',
      last_name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(register({
          email: values.email,
          password: values.password,
          first_name: values.first_name,
          last_name: values.last_name
        })).unwrap();
        navigate('/');
      } catch (err) {
        setError(err.message || 'Registration failed');
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Registrarse
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <TextField
          fullWidth
          id="password2"
          name="password2"
          label="Confirmar Contraseña"
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          value={formik.values.password2}
          onChange={formik.handleChange}
          error={formik.touched.password2 && Boolean(formik.errors.password2)}
          helperText={formik.touched.password2 && formik.errors.password2}
        />
        
        <TextField
          fullWidth
          id="first_name"
          name="first_name"
          label="Nombre"
          margin="normal"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
        />
        
        <TextField
          fullWidth
          id="last_name"
          name="last_name"
          label="Apellido"
          margin="normal"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
        />
        
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
          sx={{ mt: 2 }}
        >
          Registrarse
        </Button>
        
        <Box mt={2}>
          <Typography variant="body2">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default RegisterForm;