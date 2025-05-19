from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order, OrderItem, Payment
from .serializers import OrderSerializer, PaymentSerializer, CreateOrderSerializer
from products.models import Product

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'], serializer_class=CreateOrderSerializer)
    def create_order(self, request):
        serializer = CreateOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        cart_items = serializer.validated_data['cart_items']
        order_items = []
        subtotal = 0
        
        for item in cart_items:
            try:
                product = Product.objects.get(id=item['product_id'])
                quantity = item['quantity']
                
                if product.stock < quantity:
                    return Response(
                        {'error': f'Not enough stock for {product.name}'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                price = product.discount_price if product.discount_price else product.price
                total = price * quantity
                
                order_items.append({
                    'product': product,
                    'quantity': quantity,
                    'price': price,
                    'total': total
                })
                
                subtotal += total
                product.stock -= quantity
                product.save()
                
            except Product.DoesNotExist:
                return Response(
                    {'error': f'Product with id {item["product_id"]} not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
        
        # Calculate tax and shipping (simplified)
        tax = subtotal * 0.16  # 16% IVA
        shipping_cost = 100 if subtotal < 1000 else 0  # Free shipping over 1000
        total = subtotal + tax + shipping_cost
        
        order = Order.objects.create(
            user=request.user,
            status='pending',
            payment_method=serializer.validated_data['payment_method'],
            subtotal=subtotal,
            tax=tax,
            shipping_cost=shipping_cost,
            total=total,
            shipping_address=serializer.validated_data['shipping_address'],
            note=serializer.validated_data.get('note', '')
        )
        
        for item in order_items:
            OrderItem.objects.create(
                order=order,
                product=item['product'],
                quantity=item['quantity'],
                price=item['price'],
                total=item['total']
            )
        
        # Create payment record
        Payment.objects.create(
            order=order,
            amount=total,
            payment_method=order.payment_method,
            status='pending'
        )
        
        return Response(
            OrderSerializer(order, context={'request': request}).data,
            status=status.HTTP_201_CREATED
        )

class PaymentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(order__user=self.request.user)