from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.conf import settings
from django.template.loader import render_to_string

class EmailService():

    def __init__(self):
        pass

    def send_new_password_link(self, request, emailAddress):

        if self.__is_email_address_exists(request, emailAddress):

            status = SendEmail().send_mail(request)
            
            if status:
                return {
                    "sent": True,
                    "text": "We sent password change link to your email.",
                }
            else:
                return {
                    "sent": False,
                    "error": "Unable to send link, Try again.",
                }    
        else:
            return {
                "sent": False,
                "error": "Account not present on this email address",
            }

    def __is_email_address_exists(self, request, emailAddress):

        try:
            user = User.objects.get(username=emailAddress, is_active=1)
            return True
        except User.DoesNotExist:
            return False


class SendEmail():

    def __init__(self):
        pass

    def send_mail(self, request):

        template = render_to_string('passwordChangeLinkEmailBody.html', {
            "link": "http://127.0.0.1:8000/scvvc/"
        })

        email = EmailMessage(
            'Change password',
            template,
            settings.EMAIL_HOST_USER,
            ['harshughareja87933@gmail.com'],
        )

        email.from_email = False

        try:
            email.send()
            return True
        except BaseException as e:
            print(e)
            return False