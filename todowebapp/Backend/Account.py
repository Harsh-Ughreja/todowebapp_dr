from django.contrib.auth.models import User
from django.http import HttpResponseServerError

class AccountClass():

    def __init__(self):
        pass

    def change_user_name(self, request, newUserName):

        user = User.objects.get(id=request.user.id, is_active=1)
        user.first_name = newUserName

        try:
            user.save()
            return {
                "updated": True,
            }
        except BaseException as e:
            raise HttpResponseServerError()
    
    def change_password(self, request, newPassword):

        user = User.objects.get(id=request.user.id, is_active=1)
        
        try:
            user.set_password(newPassword)
            user.save() 
            return {
                "updated": True,
            }
        except BaseException as e:
            print(e)
            raise HttpResponseServerError()