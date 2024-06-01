from django.core.mail import EmailMultiAlternatives

def send_email(subject, message, recipient_list):
    """
    Function to send email using Django's send_mail function.
    
    :param subject: Subject of the email.
    :param message: Message body of the email.
    :param recipient_list: List of email addresses of the recipients.
    """
    # Send email
    msg = EmailMultiAlternatives(subject=subject, body=message, from_email="maddinenimahesh1998@gmail.com", to=recipient_list)
    msg.attach_alternative(message, "text/html")
    msg.send()