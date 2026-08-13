from django.urls import path
from .views import vehicles, rentals, create_rental


urlpatterns = [
    path("vehicles", vehicles, name="vehicles"),
    path("rentals", rentals, name="rentals"),
    path("rentals/create", create_rental, name="create_rental"),
]