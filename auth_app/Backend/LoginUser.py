from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

class LoginUser():

    def __init__(self):
        pass

    def login_user(self, request, email_address, password):

        user = authenticate(request, username=email_address, password=password)
        if user is not None:
            login(request, user)
            return {
                "authenticated": True,
            }
        else:
            try:
                user = User.objects.get(username=email_address)
                return {
                    "authenticated": False,
                    "error": "Incorrect password",
                }
            except User.DoesNotExist:
                return {
                    "authenticated": False,
                    "error": "Account not found"
                }
            return {
                "authenticated": False,
                "error": "Some internal error occured",
            }


