import datetime
from todowebapp.models import *
from django.http import HttpResponseServerError

class TaskClass():

    def __init__(self):
        pass

    def create_new_task(self, request, pk_list, newTaskTitle):

        try:
            list = Lists.objects.get(pk_list=pk_list, user_id=request.user.id, is_active=1)
        except BaseException as e:
            raise HttpResponseServerError()

        newTask = Tasks(
            list=list,
            title=newTaskTitle,
            when_created_timestamp=datetime.datetime.timestamp(datetime.datetime.now())
        )

        try:
            newTask.save()
            return {
                "created": True,
                "newTask": {
                    "pk_task": newTask.pk_task,
                    "task_title": newTask.title,
                    "note": newTask.note,
                    "due_date": newTask.due_date,
                    "prority": newTask.priority,
                }
            }
        except BaseException as e:
            print(e)
            return {
                "created": False,
                "error": "Internal error occured",
            }
    
    def update_task_title(self, request, pk_task, newTitle):

        try:
            task = Tasks.objects.get(pk_task=pk_task, is_active=1)
            task.title = newTitle
            task.save()
            return {
                "updated": True,
            }
        except BaseException as e:
            print(e)
            raise HttpResponseServerError()
    
    def update_task_details(self, request, pk_task, note, due_date, priority):

        try:
            task = Tasks.objects.get(pk_task=pk_task, is_active=1)
        except BaseException as e:
            print(e)
            raise HttpResponseServerError()        
        
        print(note)
        task.note = note
        print(due_date)
        if due_date != "undefined" and task.due_date != due_date:
            task.due_date = due_date
        task.priority = int(priority)

        try:
            task.save()
            return {
                "updated": True,
            }
        except BaseException as e:
            print(e)
            return {
                "updated": False,
            }
    
    def delete_task(self, request, pk_task):

        try:
            task = Tasks.objects.get(pk_task=pk_task, is_active=1)
            task.is_active = 0
            task.save()
            return {
                "deleted": True,
            }
        except BaseException as e:
            print(e)
            raise HttpResponseServerError()
    
    def complete_task(self, request, pk_task):

        try:
            task = Tasks.objects.get(pk_task=pk_task, is_active=1)
            task.is_completed = 1
            task.save()
            return {
                "updated": True,
            }
        except BaseException as e:
            print(e)
            raise HttpResponseServerError()

class GetTasks:

    def __init__(self):
        pass

    def get_list_tasks(self, request, pk_list):

        myTasks = GetViewListTaskClass().get_tasks(request, pk_list)
        print(myTasks)

        return {
            "viewedList": self.get_list(request, pk_list),
            "tasks": myTasks
        }

    def get_list(self, request, pk_list):

        try:
            list = Lists.objects.get(pk_list=pk_list, user_id=request.user.id, is_active=1)
        except BaseException as e:
            print(e)
            raise HttpResponseServerError()
        
        return {
            "pk_list": list.pk_list,
            "list_name": list.list_name,
            "list_background": list.background_color,
        }
        

class GetViewListTaskClass():

    def get_tasks(self, request, pk_list):

        try:
            l = Lists.objects.get(user_id=request.user.id, pk_list=pk_list, is_active=1)
        except Lists.DoesNotExist:
            raise HttpResponseServerError("Data does not exists")
        n = Tasks.objects.filter(list_id=pk_list, is_completed=0, is_active=True)
        c = Tasks.objects.filter(list_id=pk_list, is_completed=1, is_active=True)
        print(n)
        n = self.printNotes(n, len(n))
        return {
            "notes": self.__convert_into_json(n, list),
            "completed": len(c),
        }

    def printNotes(self, n, l):
        high, mid, low, non = self.sapareateWithPriority(n, l)
        ans = []

        wd, wod = self.sapareateWithDueDate(high)
        ans = ans + self.sortDate(wd) + wod

        wd, wod = self.sapareateWithDueDate(mid)
        ans = ans + self.sortDate(wd) + wod

        wd, wod = self.sapareateWithDueDate(low)
        ans = ans + self.sortDate(wd) + wod

        wd, wod = self.sapareateWithDueDate(non)
        ans = ans + self.sortDate(wd) + wod

        return ans

    def sapareateWithPriority(self, li, le):
        h, m, l, n = [], [], [], []
        for i in li:
            if i.priority == 3:
                h.append(i)
            elif i.priority == 2:
                m.append(i)
            elif i.priority == 1:
                l.append(i)
            elif i.priority == 0:
                n.append(i)
        return h, m, l, n

    def sapareateWithDueDate(self, n):
        with_date = []
        without_date = []
        for i in n:
            if i.due_date is None or i.due_date == '':
                without_date.append(i)
            else:
                with_date.append(i)
        return with_date, without_date

    def sortDate(self, n):
        d = []
        for i in n:
            d.append({'id': i, 'date': i.due_date})
        d.sort(key=lambda x: x['date'])
        a = []
        for i in d:
            a.append(i['id'])
        return a
    
    def __convert_into_json(self, data, list):

        data_list = []

        for i in range(0, data.__len__()):
            one_task = {
                "pk_task": data[i].pk_task,
                "task_title": data[i].title,
                "note": data[i].note,
                "due_date": data[i].due_date,
                "priority": data[i].priority,
            }
            data_list.append(one_task)
        
        return data_list