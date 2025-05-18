import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Container, Box, Typography, Button, Grid, Paper, 
  TextField, Divider, Alert, Stepper, Step, StepLabel 
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../features/orders/ordersThunks';
import { clearCart } from '../features/cart/cartSlice';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const steps = ['Dirección de Envío', 'Método de Pago', 'Revisar Pedido'];

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const { loading, error } = useSelector(state => state.orders);
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discount_price || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const tax = subtotal * 0.16;
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + tax + shipping;

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      notes: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Requerido'),
      lastName: Yup.string().required('Requerido'),
      address: Yup.string().required('Requerido'),
      city: Yup.string().required('Requerido'),
      state: Yup.string().required('Requerido'),
      zipCode: Yup.string().required('Requerido'),
      phone: Yup.string().required('Requerido'),
    }),
    onSubmit: (values) => {
      const orderData = {
        cart_items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity
        })),
        shipping_address: `${values.address}, ${values.city}, ${values.state} ${values.zipCode}`,
        payment_method: paymentMethod,
        note: values.notes,
        subtotal,
        tax,
        shipping_cost: shipping,
        total
      };
      
      dispatch(createOrder(orderData)).then((action) => {
        if (createOrder.fulfilled.match(action)) {
          dispatch(clearCart());
          setActiveStep(activeStep + 1);
        }
      });
    }
  });

  const handleNext = () => {
    if (activeStep === 0) {
      formik.validateForm().then(errors => {
        if (Object.keys(errors).length === 0) {
          setActiveStep(activeStep + 1);
        }
      });
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (items.length === 0 && activeStep < 2) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Tu carrito está vacío. Agrega productos antes de proceder al pago.
        </Alert>
        <Button component={Link} to="/products" variant="contained">
          Continuar Comprando
        </Button>
      </Container>
    );
  }

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === 0 && (
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Información de Envío
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
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
                      id="address"
                      name="address"
                      label="Dirección"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="city"
                      name="city"
                      label="Ciudad"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      error={formik.touched.city && Boolean(formik.errors.city)}
                      helperText={formik.touched.city && formik.errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="state"
                      name="state"
                      label="Estado"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      error={formik.touched.state && Boolean(formik.errors.state)}
                      helperText={formik.touched.state && formik.errors.state}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="zipCode"
                      name="zipCode"
                      label="Código Postal"
                      value={formik.values.zipCode}
                      onChange={formik.handleChange}
                      error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                      helperText={formik.touched.zipCode && formik.errors.zipCode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="notes"
                      name="notes"
                      label="Notas adicionales (opcional)"
                      multiline
                      rows={3}
                      value={formik.values.notes}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Resumen del Pedido
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  {items.map((item) => (
                    <Box key={item.product.id} display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2">
                        {item.product.name} x {item.quantity}
                      </Typography>
                      <Typography variant="body2">
                        ${((item.product.discount_price || item.product.price) * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Subtotal:</Typography>
                    <Typography>${subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Envío:</Typography>
                    <Typography>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography>Impuestos:</Typography>
                    <Typography>${tax.toFixed(2)}</Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Total:</Typography>
                    <Typography variant="subtitle1">${total.toFixed(2)}</Typography>
                  </Box>
                </Box>
                
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleNext}
                >
                  Continuar al Pago
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </form>
      )}
      
      {activeStep === 1 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Método de Pago
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={<Radio checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CreditCard sx={{ mr: 1 }} />
                      <Typography>Tarjeta de Crédito/Débito</Typography>
                    </Box>
                  }
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={<Radio checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PayPal sx={{ mr: 1 }} />
                      <Typography>PayPal</Typography>
                    </Box>
                  }
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={<Radio checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocalAtm sx={{ mr: 1 }} />
                      <Typography>Efectivo al Recibir</Typography>
                    </Box>
                  }
                />
              </Box>
              
              {paymentMethod === 'card' && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Detalles de la Tarjeta
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Número de Tarjeta"
                        placeholder="1234 5678 9012 3456"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nombre en la Tarjeta"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        fullWidth
                        label="MM/AA"
                        placeholder="MM/AA"
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        fullWidth
                        label="CVV"
                        placeholder="123"
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button onClick={handleBack}>
                Regresar
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Revisar Pedido
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <OrderSummary 
              items={items} 
              subtotal={subtotal} 
              tax={tax} 
              shipping={shipping} 
              total={total} 
            />
          </Grid>
        </Grid>
      )}
      
      {activeStep === 2 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Confirmación de Pedido
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Dirección de Envío
                </Typography>
                <Typography>
                  {formik.values.firstName} {formik.values.lastName}
                </Typography>
                <Typography>{formik.values.address}</Typography>
                <Typography>
                  {formik.values.city}, {formik.values.state} {formik.values.zipCode}
                </Typography>
                <Typography>{formik.values.phone}</Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Método de Pago
                </Typography>
                <Typography>
                  {paymentMethod === 'card' && 'Tarjeta de Crédito/Débito'}
                  {paymentMethod === 'paypal' && 'PayPal'}
                  {paymentMethod === 'cash' && 'Efectivo al Recibir'}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Notas
                </Typography>
                <Typography>
                  {formik.values.notes || 'Ninguna'}
                </Typography>
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={formik.handleSubmit}
                disabled={loading}
              >
                {loading ? 'Procesando...' : 'Confirmar Pedido'}
              </Button>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <OrderSummary 
              items={items} 
              subtotal={subtotal} 
              tax={tax} 
              shipping={shipping} 
              total={total} 
            />
          </Grid>
        </Grid>
      )}
      
      {activeStep === 3 && (
        <Box textAlign="center" py={6}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            ¡Pedido Confirmado!
          </Typography>
          <Typography variant="body1" paragraph>
            Gracias por tu compra. Hemos enviado un correo con los detalles de tu pedido.
          </Typography>
          <Typography variant="body1" paragraph>
            Número de pedido: #123456
          </Typography>
          <Button 
            component={Link} 
            to="/orders" 
            variant="contained" 
            size="large"
            sx={{ mt: 3 }}
          >
            Ver Mis Pedidos
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default CheckoutPage;