from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from auth_app.Backend.SignupUser import SignupUser
from auth_app.Backend.LoginUser import LoginUser
from django.contrib.auth import logout
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from auth_app.Backend.EmailService import EmailService


class SignupUserView(View):

    def post(self, request):

        username = request.POST.get("userName")
        email_address = request.POST.get("emailAddress")
        password = request.POST.get("password")

        status = SignupUser().signup_user(request, username, email_address, password)

        return JsonResponse({
            "status": "ok",
            "content": status,
        })

class LoginUserView(View):

    def post(self, request):

        email_address = request.POST.get("emailAddress")
        password = request.POST.get("password")

        if ' ' in password:
            return JsonResponse({
                "status": "ok",
                "content": {
                    "authenticated": False,
                    "error": "Incorrect password"
                }
            })
        
        status = LoginUser().login_user(request, email_address, password)
        return JsonResponse({
            "status": "ok",
            "content": status,
        })

class IsLoggedinView(View):

    def post(self, request):

        if request.user.is_anonymous:
            isLoggedin = False
            userName = ""
            emailAddress = ""
            themeStyle = ""
        else:
            user = User.objects.get(id=request.user.id)
            userName = user.first_name
            emailAddress = user.username
            themeStyle = user.last_name
            isLoggedin = True
        
        return JsonResponse({
            "status": "ok",
            "content": {
                "isLoggedIn": isLoggedin,
                "emailAddress": emailAddress,
                "userName": userName,
                "themeStyle": themeStyle
            }
        })


class LogoutUserView(View):

    def post(self, request):

        if request.user.is_anonymous:
            pass
        else:
            logout(request)
        
        return JsonResponse({
            "status": "ok",
            "content": {
                "isLoggedOut": True,
            }
        })


class CheckPasswordView(View):

    def post(self, request):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": ''
            })
        else:
            password = request.POST.get('password')
            
            user = User.objects.get(id=request.user.id, is_active=1)
            isValid = authenticate(request, username=user.username, password=password)

            return JsonResponse({
                "status": "ok",
                "authenticated": True,
                "content": {
                    "correctPassword": True if isValid is not None else False
                }
            }) 


class SendChangePasswordLinkView(View):
    
    def post(self, request):

        emailAddress = request.POST.get('emailAddress')

        status = EmailService().send_new_password_link(request, emailAddress)

        return JsonResponse({
            "status": "ok",
            "authenticated": not request.user.is_anonymous,
            "content": status,
        })