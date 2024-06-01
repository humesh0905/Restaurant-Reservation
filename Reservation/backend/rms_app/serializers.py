from rest_framework import serializers
from .models import Customer, Table, Reservation

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['customer_id', 'first_name', 'last_name', 'phone', 'email']

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['table_id', 'table_name', 'capacity', 'section', 'status']

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = ['reservation_id', 'reservation_time', 'reservation_date', 'status', 'guests', 'customer', 'table']
