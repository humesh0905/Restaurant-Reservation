from django.urls import path
from . import views

urlpatterns = [
    # Customer URLs
    path('customers', views.customer_list, name='customer_list'),
    path('customers/<int:customer_id>', views.get_customer, name='get_customer'),
    path('customers/create', views.create_customer, name='create_customer'),
    path('customers/update/<int:customer_id>', views.update_customer, name='update_customer'),
    path('customers/delete/<int:customer_id>', views.delete_customer, name='delete_customer'),

    # Table URLs
    path('tables', views.table_list, name='table_list'),
    path('tables/clean/<int:min_capacity>', views.table_list, {'status': 'clean'}, name='clean_tables_list'),
    path('tables/<int:table_id>', views.get_table, name='get_table'),
    path('tables/create', views.create_table, name='create_table'),
    path('tables/update/<int:table_id>', views.update_table, name='update_table'),
    path('tables/delete/<int:table_id>', views.delete_table, name='delete_table'),

    # Reservation URLs
    path('reservations', views.reservation_list, name='reservation_list_all'),
    path('reservations/waiting', views.reservation_list, {'status': 'waiting'}, name='reservation_list_waiting'),
    path('reservations/confirmed', views.reservation_list, {'status': 'confirmed'}, name='reservation_list_confirmed'),
    path('reservations/closed', views.reservation_list, {'status': 'closed'}, name='reservation_list_closed'),
    path('reservations/<int:reservation_id>', views.get_reservation, name='get_reservation'),
    path('reservations/create', views.create_reservation, name='create_reservation'),
    path('reservations/update/<int:reservation_id>', views.update_reservation, name='update_reservation'),
    path('reservations/delete/<int:reservation_id>', views.delete_reservation, name='delete_reservation'),

    # Email
    path('send/reservation/email', views.send_reservation_creation_email, name='reservation_creation_email'),
    path('send/confirmation/email', views.send_reservation_confirmation_email, name='reservation_confirmation_email'),
    path('live/track/waitlist/<int:reservation_id>', views.get_live_waitlist_status, name='live_waitlist_status'),
]

