from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Customer, Table, Reservation
from .serializers import CustomerSerializer, TableSerializer, ReservationSerializer
import json
from . import utils

# Customer CRUD Operations
@csrf_exempt
def create_customer(request):
    if request.method == 'POST':
        json_data = ""
        try:
            json_data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        serializer = CustomerSerializer(data=json_data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

@csrf_exempt
def customer_list(request):
    if request.method == 'GET':
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)

@csrf_exempt
def get_customer(request, customer_id):
    try:
        customer = Customer.objects.get(pk=customer_id)
    except Customer.DoesNotExist:
        return JsonResponse({'error': 'Customer not found'}, status=404)

    if request.method == 'GET':
        serializer = CustomerSerializer(customer)
        return JsonResponse(serializer.data)
    return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)

@csrf_exempt
def update_customer(request, customer_id):
    try:
        customer = Customer.objects.get(pk=customer_id)
    except Customer.DoesNotExist:
        return JsonResponse({'error': 'Customer not found'}, status=404)
    try:
        json_data = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    if request.method == 'PUT':
        serializer = CustomerSerializer(customer, data=json_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    return JsonResponse({'error': 'Only PUT requests are allowed'}, status=405)

@csrf_exempt
def delete_customer(request, customer_id):
    try:
        customer = Customer.objects.get(pk=customer_id)
        print(customer.__dict__)
    except Customer.DoesNotExist:
        return JsonResponse({'error': 'Customer not found'}, status=404)

    if request.method == 'DELETE':
        # Delete the customer
        customer.delete()
        # Return a success response indicating that the customer was deleted
        return JsonResponse({'message': 'Customer deleted successfully'}, status=204)
    
    # If the request method is not DELETE, return an error response
    return JsonResponse({'error': 'Only DELETE requests are allowed'}, status=405)



# Table CRUD Operations
@csrf_exempt
def create_table(request):
    json_data = ""
    try:
        json_data = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    if request.method == 'POST':
        serializer = TableSerializer(data=json_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

@csrf_exempt
def table_list(request, status=None, min_capacity=None):
    if request.method == 'GET':
        if status is None:
            tables = Table.objects.all()
        elif status == 'clean':
            tables = Table.objects.filter(status='Clean')
            if min_capacity is not None:
                tables = tables.filter(capacity__gte=min_capacity)
        else:
            # If status is neither 'Clean' nor 'None', return an error response
            return JsonResponse({'error': 'Invalid status parameter'}, status=400)
        
        serializer = TableSerializer(tables, many=True)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)

@csrf_exempt
def get_table(request, table_id):
    try:
        table = Table.objects.get(pk=table_id)
    except Table.DoesNotExist:
        return JsonResponse({'error': 'Table not found'}, status=404)

    if request.method == 'GET':
        serializer = TableSerializer(table)
        return JsonResponse(serializer.data)
    return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)

@csrf_exempt
def update_table(request, table_id):
    try:
        table = Table.objects.get(pk=table_id)
    except Table.DoesNotExist:
        return JsonResponse({'error': 'Table not found'}, status=404)

    try:
        json_data = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    if request.method == 'PUT':
        serializer = TableSerializer(table, data=json_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    return JsonResponse({'error': 'Only PUT requests are allowed'}, status=405)

@csrf_exempt
def delete_table(request, table_id):
    try:
        table = Table.objects.get(pk=table_id)
    except Table.DoesNotExist:
        return JsonResponse({'error': 'Table not found'}, status=404)

    if request.method == 'DELETE':
        # Delete the table
        table.delete()
        # Return a success response indicating that the table was deleted
        return JsonResponse({'message': 'Table deleted successfully'}, status=204)
    
    # If the request method is not DELETE, return an error response
    return JsonResponse({'error': 'Only DELETE requests are allowed'}, status=405)



# Reservation CRUD Operations
@csrf_exempt
def create_reservation(request):
    json_data = ""
    try:
        json_data = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    # json_data["customer"] = Customer.objects.get(pk=json_data["customer"])
    # json_data["table"] = Table.objects.get(pk=json_data["table"])
    # print(json_data)  

    
    if request.method == 'POST':
        serializer = ReservationSerializer(data=json_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

@csrf_exempt
def reservation_list(request, status=None):
    if request.method == 'GET':
        if status is None:
            # If no status is specified, return all reservations
            reservations = Reservation.objects.all()
        elif status == 'waiting':
            # If status is 'waiting', filter reservations with status 'waiting'
            reservations = Reservation.objects.filter(status='Queued')
        elif status == 'confirmed':
            # If status is 'confirmed', filter reservations with status 'confirmed'
            reservations = Reservation.objects.filter(status='Reserved')
        elif status == 'closed':
            # If status is 'confirmed', filter reservations with status 'confirmed'
            reservations = Reservation.objects.filter(status='Cancelled') | Reservation.objects.filter(status='Complete')
        else:
            # If status is neither 'waiting' nor 'confirmed', return an error response
            return JsonResponse({'error': 'Invalid status parameter'}, status=400)
        
        serializer = ReservationSerializer(reservations, many=True)
        return JsonResponse(serializer.data, safe=False)
    
    # If the request method is not GET, return an error response
    return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)


@csrf_exempt
def get_reservation(request, reservation_id):
    try:
        reservation = Reservation.objects.get(pk=reservation_id)
    except Reservation.DoesNotExist:
        return JsonResponse({'error': 'Reservation not found'}, status=404)

    if request.method == 'GET':
        serializer = ReservationSerializer(reservation)
        return JsonResponse(serializer.data)
    return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)

@csrf_exempt
def update_reservation(request, reservation_id):
    try:
        reservation = Reservation.objects.get(pk=reservation_id)
    except Reservation.DoesNotExist:
        return JsonResponse({'error': 'Reservation not found'}, status=404)
    
    try:
        json_data = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    if request.method == 'PUT':
        serializer = ReservationSerializer(reservation, data=json_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    return JsonResponse({'error': 'Only PUT requests are allowed'}, status=405)

@csrf_exempt
def delete_reservation(request, reservation_id):
    try:
        reservation = Reservation.objects.get(pk=reservation_id)
    except Reservation.DoesNotExist:
        return JsonResponse({'error': 'Reservation not found'}, status=404)

    if request.method == 'DELETE':
        # Delete the reservation
        reservation.delete()
        # Return a success response indicating that the reservation was deleted
        return JsonResponse({'message': 'Reservation deleted successfully'}, status=204)
    
    # If the request method is not DELETE, return an error response
    return JsonResponse({'error': 'Only DELETE requests are allowed'}, status=405)

@csrf_exempt
def send_reservation_creation_email(request):
    """
    API endpoint to send email.
    """
    json_data = ""
    try:
        json_data = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
    queued_customers = Reservation.objects.filter(status="Queued", reservation_id__lte=json_data['reservation_id'])

    reservation = Reservation.objects.get(pk=json_data['reservation_id'])

    if request.method == 'POST':
        subject = "Reservation Created"
        message = f"""
        <html>
        <head></head>
        <body>
            <p>Dear {reservation.customer.first_name},</p>
            <p>Your reservation has been created.</p>
            <p><b>Your waitlist number is {queued_customers.count()}.</b></p>
            <p>Please <a href="http://localhost:8000/rms/live/track/waitlist/{reservation.reservation_id}">click here</a> to live track the status of your waitlist reservation.</p>
            <p>Thank you for choosing our service.</p>
            <p>Best Regards,</p>
            <p>Manager</p>
        </body>
        </html>
        """
        recipient_email = json_data['recipient_email']
        
        utils.send_email(subject, message, [recipient_email])
        
        return JsonResponse({'message': 'Email sent successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Unsupported request method'}, status=405)

@csrf_exempt
def get_live_waitlist_status(request, reservation_id):
    try:
        reservation = Reservation.objects.get(pk=reservation_id)
    except Reservation.DoesNotExist:
        return JsonResponse({'error': 'Reservation not found'}, status=404)
    
    if reservation.status == "Reserved":
        # Construct HTML content
        html_content = f"""
        <html>
        <head></head>
        <body>
            <p>Your table is ready. Please visit the reception promptly. Thank you.</p>
        </body>
        </html>
        """
        # Return HTML response
        return HttpResponse(html_content, content_type='text/html')
    
    queued_customers = Reservation.objects.filter(status="Queued", reservation_id__lte=reservation_id)
    

    if request.method == 'GET':
        waitlist_count = queued_customers.count()  # Adding 1 to include the current customer

        # Construct HTML content
        html_content = f"""
        <html>
        <head></head>
        <body>
            <p>Waitlist Count: {waitlist_count}</p>
        </body>
        </html>
        """

        # Return HTML response
        return HttpResponse(html_content, content_type='text/html')
    return JsonResponse({'error': 'Only GET requests are allowed'}, status=405)

@csrf_exempt
def send_reservation_confirmation_email(request):
    """
    API endpoint to send email.
    """
    json_data = ""
    try:
        json_data = json.loads(request.body.decode('utf-8'))
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    reservation = Reservation.objects.get(pk=json_data['reservation_id'])

    if request.method == 'POST':
        subject = "Reservation Confirmed"
        message = f"""
        <html>
        <head></head>
        <body>
            <p>Dear {reservation.customer.first_name},</p>
            <p>Your reservation has been successfully confirmed at {reservation.reservation_time}. Kindly proceed to the reception within the next 15 minutes to complete the check-in process.</p>
            <p>Thank you for choosing our service.</p>

            <p>Best Regards,</p>
            <p>Manager</p>
        </body>
        </html>
        """
        recipient_email = json_data['recipient_email']
        
        utils.send_email(subject, message, [recipient_email])
        
        return JsonResponse({'message': 'Email sent successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Unsupported request method'}, status=405)