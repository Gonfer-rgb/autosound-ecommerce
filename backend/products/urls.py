from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, BrandViewSet, ProductViewSet, ProductReviewViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'brands', BrandViewSet)
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('products/<slug:product_slug>/reviews/', 
         ProductReviewViewSet.as_view({'get': 'list', 'post': 'create'}), 
         name='product-reviews'),
    path('products/<slug:product_slug>/reviews/<int:pk>/', 
         ProductReviewViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), 
         name='product-review-detail'),
]