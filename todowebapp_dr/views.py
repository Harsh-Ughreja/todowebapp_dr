from django.shortcuts import render
from django.views import View
# from django.middleware.csrf import _get_new_csrf_token
from django.middleware.csrf import get_token


# Create your views here.


class Index(View):

    def get(self, request, *args, **kwargs):

        response = render(request, "index.html") 

        try:
            request.COOKIES['csrftoken']
        except BaseException as e:
            response.set_cookie("csrftoken", setNewCSRFToken(request))

        return response

def setNewCSRFToken(request):
     newToken = get_token(request)
     print(newToken)
     return newToken