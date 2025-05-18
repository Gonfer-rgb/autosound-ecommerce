import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Chip, Button } from '@mui/material';
  import { useSelector } from 'react-redux';
  import { Link } from 'react-router-dom';
  import Loading from '../components/common/Loading';
  import Error from '../components/common/Error';
  
  const OrderHistoryPage = () => {
    const { orders, loading, error } = useSelector(state => state.orders);
    const { user } = useSelector(state => state.auth);
  
    if (loading) return <Loading />;
    if (error) return <Error message={error} />;
  
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Historial de Pedidos
        </Typography>
        
        {orders.length === 0 ? (
          <Box textAlign="center" py={6}>
            <Typography variant="h6" gutterBottom>
              No has realizado ningún pedido aún
            </Typography>
            <Button 
              component={Link} 
              to="/products" 
              variant="contained" 
              size="large"
            >
              Comenzar a Comprar
            </Button>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Número de Pedido</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.order_number}</TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip 
                        label={order.status} 
                        color={
                          order.status === 'delivered' ? 'success' : 
                          order.status === 'cancelled' ? 'error' : 'primary'
                        } 
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        component={Link} 
                        to={`/orders/${order.id}`} 
                        size="small"
                      >
                        Ver Detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    );
  };
  
  export default OrderHistoryPage;