from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Vehicle, Rental
from .serializers import VehicleSerializer, RentalSerializer


@api_view(["GET"])
def vehicles(request):
    vehicles = Vehicle.objects.all()
    serializer = VehicleSerializer(vehicles, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def rentals(request):
    rentals = Rental.objects.all()
    serializer = RentalSerializer(rentals, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def create_rental(request):
    serializer = RentalSerializer(data=request.data)

    if serializer.is_valid():
        rental = serializer.save()


        return Response(
            RentalSerializer(rental).data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )