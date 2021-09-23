from todowebapp.models import *
from django.http import HttpResponseServerError
import datetime
from django.db import connection

class ListClass():

    def __init__(self):
        pass

    def create_new_list(self, request, newListName):

        if self.__is_list_name_exists(request, newListName, 0):
            return {
                "created": False,
                "error": "List name is already exists",
            }

        user = User.objects.get(id=request.user.id)
        try:
            newList = Lists(user=user, list_name=newListName,
                            when_created_timestamp=datetime.datetime.timestamp(datetime.datetime.now()))
            newList.save()
            return {
                "created": True,
                "newList": ""
            }
        except BaseException as e:
            print(e)
            raise HttpResponseServerError()

    def __is_list_name_exists(self, request, newListName, exculde):

        try:
            if exculde == 0:
                lists = Lists.objects.filter(
                    user_id=request.user.id, list_name=newListName, is_active=1).count()
            else:
                lists = Lists.objects.filter(
                    user_id=request.user.id, list_name=newListName, is_active=1).exclude(pk_list=exculde).count()

            if lists > 0:
                return True
            else:
                return False
        except BaseException as e:
            print(e)
            raise HttpResponseServerError()
    
    def update_list(self, request, pk_list, newName, background_color):

        if self.__is_list_name_exists(request, newName, pk_list):
            return {
                "updated": False,
                "error": "List name is already exists",
            }
        else:
            list = Lists.objects.get(pk_list=pk_list, user_id=request.user.id, is_active=1)
            list.list_name = newName
            list.background_color = background_color
            try:
                list.save()
                return {
                    "updated": True,
                }
            except BaseException as e:
                print(e)
                return {
                    "updated": False,
                    "error": "Internal error occured",
                }
    
    def delete_list(self, request, pk_list):

        try:
            list = Lists.objects.get(pk_list=pk_list, is_active=1, user_id=request.user.id)
        except BaseException as e:
            print(e)
            raise HttpResponseServerError()

        tasks = Tasks.objects.filter(list_id=pk_list, is_active=1)
        for i in range(0, tasks.__len__()):
            tasks[i].is_active = 0
            tasks[i].save()
        
        list.is_active=0
        list.save()

        return {
            "deleted": True
        }

class GetMyListClass():

    def __init__(self):
        self.cursor = connection.cursor()

    def get_my_lists(self, request):

        sql = f"""
        select lists.pk_list, lists.list_name, lists.background_color
        from todowebapp_lists lists
        where 
            lists.user_id={request.user.id} and
            lists.is_active=1
        order by lists.pk_list desc;
        """

        self.cursor.execute(sql)
        lists = self.cursor.fetchall()

        return {
            "myLists": self.__convert_into_json(request, lists)
        }
    
    def __get_some_tasks_titles(self, request, pk_list):

        try:
            tasks = Tasks.objects.filter(list_id=pk_list, is_active=1, is_completed=0)[0:6]
            task_titles = []
            for i in range(0, tasks.__len__()):
                task_titles.append(tasks[i].title)
            return task_titles
        except BaseException as e:
            print(e)
            raise HttpResponseServerError


    def __convert_into_json(self, request, lists):

        data_list = []

        """
        Format:
        0: pk_list
        1: list_name
        2: background
        """

        for i in range(0, lists.__len__()):

            one_list = {
                "pk_list": lists[i][0],
                "list_name": lists[i][1],
                "list_background": lists[i][2],
                "recent_tasks": self.__get_some_tasks_titles(request, lists[i][0])
            }

            data_list.append(one_list)
        
        return data_list