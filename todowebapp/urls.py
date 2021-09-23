from django.urls import path
from todowebapp import views

urlpatterns = [
    path('new/<slug:type>', views.NewClass.as_view(), name="new"),
    
    path('get/myLists/', views.GetMyListsView.as_view(), name="get-mylist"),
    path('get/listTasks/', views.GetListTasksView.as_view(), name="get-listtasks"),
    path('get/today', views.GetTodayTaskView.as_view(), name="get-today"),
    path('get/scheduled', views.GetScheduledView.as_view(), name="get-scheduled"),
    path('get/accountDetail', views.GetAccountDetails.as_view(), name="get-account-details"),

    path('update/list', views.UpdateListView.as_view(), name="update-list"),
    path('update/task/<slug:attr_name>', views.UpdateTaskView.as_view(), name="update-task"),
    path('update/account/<slug:attr_name>', views.UpdateAccountView.as_view(), name="update-account"),

    path('change/headerTheme', views.ChangeHeaderThemeView.as_view(), name="change-header-theme"),

    path('delete/<slug:type>', views.DeleteView.as_view(), name="delete"),
]
