from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User


class SignupUser():

    def __init__(self):
        pass

    def signup_user(self, request, username, email_address, password):


        taken = self.isTakenOrNot(request, email_address)

        if taken:
            return {
                "created": False,
                "error": "Email address already exists",
            }
        else:
            new_user = User.objects.create_user(
                username=email_address, first_name=username, last_name="dark", email=email_address, password=password)
            new_user.save()
            login(request, new_user)
            return {
                "created": True,
            }

    def isTakenOrNot(self, request, email):
        user = User.objects.filter(email=email).count()
        if user > 0:
            return True
        else:
            return False