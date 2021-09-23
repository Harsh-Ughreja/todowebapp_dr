from django.http import JsonResponse
from todowebapp.Backend.MyLists import ListClass, GetMyListClass
from todowebapp.Backend.MyTasks import TaskClass, GetTasks
from django.views import View
import time
from django.contrib.auth.models import User
from django.http import HttpResponseServerError
from todowebapp.Backend.Account import AccountClass
from todowebapp.Backend.Today import TodayClass
from todowebapp.Backend.MyScheduled import ScheduledClass

class NewClass(View):

    def post(self, request, type):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": ''
            })

        else:
            if type == "list":
                time.sleep(1)
                newListName = request.POST.get('newListName')
                status = ListClass().create_new_list(request, newListName)
            
            elif type == "task":
                pk_list = request.POST.get("pk_list")
                taskTitle = request.POST.get('newTaskTitle')
                status = TaskClass().create_new_task(request, pk_list, taskTitle)

            else:
                pass

            return JsonResponse({
                "status": "ok",
                "authenticated": True,
                "content": status
            })            


class GetMyListsView(View):

    def get(self, request):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": '',
            }) 
            
        else:
            
            data = GetMyListClass().get_my_lists(request)

            return JsonResponse({
                "status": "ok",
                "authenticated": True,
                "content": data,
            })

class GetScheduledView(View):

    def get(self, request):
        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": '',
            }) 
        else:
            data =ScheduledClass().get_schedualed_tasks(request)
            
            return JsonResponse({
                "status": "ok",
                "authenticated": True,
                "content": data,
            })


class GetListTasksView(View):

    def get(self, request):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": '',
            }) 
            
        else:
            pk_list = request.GET.get('pk_list')
            data = GetTasks().get_list_tasks(request, pk_list)

            return JsonResponse({
                "status": "ok",
                "authenticated": True,
                "content": data,
            })

class GetTodayTaskView(View):

    def get(self, request):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": '',
            }) 
            
        else:
            data = TodayClass().get_today_tasks(request)

            return JsonResponse({
                "status": "ok",
                "authenticated": True,
                "content": data,
            })

class UpdateListView(View):

    def post(self, request):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": '',
            }) 
        else:
            pk_list = request.POST.get('pk_list')
            newName = request.POST.get("newName")
            background_color = request.POST.get("backgroundColor")
            status = ListClass().update_list(request, pk_list, newName, background_color)
            return JsonResponse({
                "status": "ok",
                "authenticated": True,
                "content": status,
            }) 

class UpdateTaskView(View):

    def post(self, request, attr_name):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": '',
            }) 
        else:
            if attr_name == "taskTitle":
                pk_task = request.POST.get('pk_task')
                newTitle =request.POST.get('newTitle')
                status = TaskClass().update_task_title(request, pk_task, newTitle)
            
            elif attr_name == "taskDetail":
                pk_task = request.POST.get('pk_task')
                note = request.POST.get("note")
                due_date = request.POST.get("due_date")
                priority = request.POST.get('priority')
                status = TaskClass().update_task_details(request, pk_task, note, due_date, priority)
            
            elif attr_name == "complete":
                pk_task = request.POST.get('pk_task')
                status = TaskClass().complete_task(request, pk_task)
                
            else:
                pass

            return JsonResponse({
                "status": "ok",
                "authenticated": True,
                "content": status,
            }) 


class DeleteView(View):

    def post(self, request, type):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": '',
            }) 

        else:

            if type == "list":
                pk_list = request.POST.get("pk_list")
                status = ListClass().delete_list(request, pk_list)
            elif type == "task":
                pk_task = request.POST.get('pk_task')
                status = TaskClass().delete_task(request, pk_task)
            else:
                pass

            return JsonResponse({
                "status": "ok",
                "authenticated": True,
                "content": status,
            }) 


class GetAccountDetails(View):

    def post(self, request):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": '',
            })
        else:
            try:
                user = User.objects.get(id=request.user.id, is_active=1)
                return JsonResponse({
                    "status": "ok",
                    "authenticated": True,
                    "content": {
                        "id": user.id,
                        "email_address": user.username,
                        "user_name": user.first_name,
                        "theme_style": user.last_name
                    }
                })
            except BaseException as e:
                print(e)
                raise HttpResponseServerError()
                

class UpdateAccountView(View):

    def post(self, request, attr_name):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": '',
            })
        else:

            if attr_name == "username":
                newUserName = request.POST.get('newUserName')
                status = AccountClass().change_user_name(request, newUserName)
            elif attr_name == "password":
                newPassword = request.POST.get('newPassword')
                status = AccountClass().change_password(request, newPassword)
            else:
                pass

            return JsonResponse({
                "status": "ok",
                "authenticated": True,
                "content": status,
            }) 

class ChangeHeaderThemeView(View):

    def post(self, request):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": '',
            })
        else:
            themeStyle = request.POST.get("newTheme")
            
            try:
                user = User.objects.get(id=request.user.id)
                user.last_name = themeStyle
                user.save()
                return JsonResponse({
                    "status": "ok",
                    "authenticated": True,
                    "content": {
                        "changed": True
                    },
                })  
            except BaseException as e:
                print(e)
                raise HttpResponseServerError()


class CompleteTaskView(View):

    def post(self, request):

        if request.user.is_anonymous:
            return JsonResponse({
                "status": "fail",
                "authenticated": False,
                "content": '',
            })
        
