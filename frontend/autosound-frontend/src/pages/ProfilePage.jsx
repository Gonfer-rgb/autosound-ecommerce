import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Container, Box, Typography, TextField, Button, 
  Avatar, Divider, Alert, Tabs, Tab 
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../features/auth/authThunks';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);
  const [tabValue, setTabValue] = useState(0);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      avatar: null,
      bio: user?.profile?.bio || ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Requerido'),
      lastName: Yup.string().required('Requerido'),
      email: Yup.string().email('Email inválido').required('Requerido'),
      phone: Yup.string().required('Requerido'),
      address: Yup.string().required('Requerido'),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('first_name', values.firstName);
      formData.append('last_name', values.lastName);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('address', values.address);
      formData.append('bio', values.bio);
      if (values.avatar) {
        formData.append('avatar', values.avatar);
      }
      
      dispatch(updateProfile(formData));
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Avatar
          src={user?.profile?.avatar}
          sx={{ 
            width: 80, 
            height: 80, 
            mr: 3,
            fontSize: 40
          }}
        >
          {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h4">
            {user?.first_name} {user?.last_name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Miembro desde {new Date(user?.date_joined).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
      
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Información Personal" />
        <Tab label="Historial de Pedidos" />
        <Tab label="Configuración" />
      </Tabs>
      
      {tabValue === 0 && (
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="Nombre"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Apellido"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Teléfono"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Dirección"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="bio"
                name="bio"
                label="Biografía"
                multiline
                rows={4}
                value={formik.values.bio}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="avatar-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={(event) => {
                  formik.setFieldValue('avatar', event.currentTarget.files[0]);
                }}
              />
              <label htmlFor="avatar-upload">
                <Button variant="outlined" component="span">
                  Cambiar Foto de Perfil
                </Button>
              </label>
              {formik.values.avatar && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {formik.values.avatar.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      
      {tabValue === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Tus Pedidos Recientes
          </Typography>
          {/* Aquí iría el componente de historial de pedidos */}
          <Typography variant="body1" color="text.secondary">
            No tienes pedidos recientes
          </Typography>
        </Box>
      )}
      
      {tabValue === 2 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Configuración de Cuenta
          </Typography>
          <Button variant="outlined" color="error">
            Cambiar Contraseña
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ProfilePage;