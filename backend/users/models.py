from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Puedes añadir campos personalizados aquí si los necesitas
    # Ejemplo:
    # phone = models.CharField(max_length=20, blank=True)
    pass