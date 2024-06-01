from django.db import models

class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=255, default=None)
    last_name = models.CharField(max_length=255, default=None)
    phone = models.CharField(max_length=20, default=None)
    email = models.EmailField(max_length=255, default=None)

class Table(models.Model):
    table_id = models.AutoField(primary_key=True)
    table_name = models.CharField(max_length=8, unique=True)
    capacity = models.IntegerField()
    SECTION_CHOICES = [
        ('Main', 'Main'),
        ('Private', 'Private'),
    ]
    section = models.CharField(max_length=8, choices=SECTION_CHOICES, default='Main')
    STATUS_CHOICES = [
        ('Clean', 'Clean'),
        ('Dirty', 'Dirty'),
        ('Occupied', 'Occupied'),
    ]
    status = models.CharField(max_length=8, choices=STATUS_CHOICES, default='Clean')

class Reservation(models.Model):
    reservation_id = models.AutoField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    table = models.ForeignKey(Table, null=True, default=None, on_delete=models.CASCADE)
    reservation_date = models.DateField(null=True, default=None)
    reservation_time = models.TimeField(null=True, default=None)
    guests = models.IntegerField(default=1)
    STATUS_CHOICES = [
        ('Reserved', 'Reserved'),
        ('Queued', 'Queued'),
        ('Complete', 'Complete'),
        ('Cancelled', 'Cancelled'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Queued')




