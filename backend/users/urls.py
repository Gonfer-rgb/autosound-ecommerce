from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (UserRegisterView, UserLoginView, UserProfileView,
                   UserDetailView, UserListView)

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
    path('users/', UserListView.as_view(), name='user-list'),
]