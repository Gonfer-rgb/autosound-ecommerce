from rest_framework import serializers
from products.serializers import ProductSerializer
from users.serializers import UserSerializer
from .models import Order, OrderItem, Payment

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price', 'discount', 'total']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'order_number', 'user', 'status', 'payment_method',
                 'subtotal', 'tax', 'shipping_cost', 'total', 'shipping_address',
                 'billing_address', 'note', 'created_at', 'items']
        read_only_fields = ['order_number', 'user', 'subtotal', 'tax', 
                          'shipping_cost', 'total', 'created_at']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'amount', 'transaction_id', 'payment_method', 
                 'status', 'created_at']
        read_only_fields = ['created_at']

class CreateOrderSerializer(serializers.Serializer):
    cart_items = serializers.JSONField()
    shipping_address = serializers.CharField()
    payment_method = serializers.CharField()
    note = serializers.CharField(required=False, allow_blank=True)

    def validate_payment_method(self, value):
        valid_methods = [choice[0] for choice in Order.PaymentMethod.choices]
        if value not in valid_methods:
            raise serializers.ValidationError("Invalid payment method")
        return value