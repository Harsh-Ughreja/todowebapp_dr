from todowebapp.models import *
import datetime
from django.db import connection

class ScheduledClass():

    def __init__(self):
        pass

    def get_schedualed_tasks(self, request):
        
        self.sortTasks(request)
        return {
            "scheduled_tasks": self.sortTasks(request)
        }

    def sortTasks(self, request):
        div = ["Today", "January", "February", "March", "April", "May", "June", "July", "August", "September",
               "Octomber", "November", "December", "Upcoming years"]
        
        sql = f"""
        select lists.pk_list, lists.list_name, tasks.pk_task, tasks.title, tasks.note, tasks.due_date, tasks.priority
        from todowebapp_lists lists, todowebapp_tasks tasks
        where
            lists.user_id={request.user.id} and
            lists.is_active=1 and
            lists.pk_list=tasks.list_id and
            tasks.is_completed = 0
        order by tasks.due_date, tasks.priority desc;
        """

        sorting = {
            'Today': [],
            'January': [],
            'February': [],
            'March': [],
            'April': [],
            'May': [],
            'June': [],
            'July': [],
            'August': [],
            'September': [],
            'October': [],
            'November': [],
            'December': [],
            'Next year': [],
        }

        cursor = connection.cursor()
        cursor.execute(sql)
        tasks = cursor.fetchall()

        today = datetime.date.today()
        year = today.year
        month = today.month
         
        for i in range(0, tasks.__len__()):

            if tasks[i][5] is not None and tasks[i][5] != '':

                if tasks[i][5] > today:
                 
                    if tasks[i][5].year == year:
                        sorting[div[tasks[i][5].month]].append(self.__convert_into_json(tasks[i]))
                    else:
                        sorting['Next year'].append(self.__convert_into_json(tasks[i]))

        final_result = []

        for key, value in sorting.items():
            if value.__len__():
                data = {
                    "title": key,
                    "tasks": value,
                }

                final_result.append(data)
                
        return final_result
    
    def __convert_into_json(self, task):

        """
        Format
        0: pk_list
        1: list_name
        2: pk_task
        3: title
        4: note
        5: due_date
        6: priority
        """

        return {
            "pk_task": task[2],
            "task_title": task[3],
            "note": task[4],
            "due_date": task[5],
            "priority": task[6],
            "list": {
                "list_name": task[1],
                "list_id": task[0]
            } 
        }