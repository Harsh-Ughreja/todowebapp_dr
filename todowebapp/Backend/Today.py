from todowebapp.models import *
import datetime

class TodayClass():

    def get_today_tasks(self, request):

        today = datetime.date.today()
        n = Tasks.objects.filter(
            list__user=request.user.id, due_date=today, is_completed=0, is_active=1)
        
        n = self.printNotes(n, len(n))
        return {
            "today_tasks": self.__convert_into_json(n)
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
    
    def __get_list(self, list_id):

        return Lists.objects.get(pk_list=list_id, is_active=1)
    
    def __convert_into_json(self, data):

        data_list = []

        for i in range(0, data.__len__()):
            list = self.__get_list(data[i].list_id)

            one_task = {
                "pk_task": data[i].pk_task,
                "task_title": data[i].title,
                "note": data[i].note,
                "due_date": data[i].due_date,
                "priority": data[i].priority,
                "list": {
                    "list_name": list.list_name,
                    "list_id": list.pk_list
                }
            }
            data_list.append(one_task)
        
        return data_list