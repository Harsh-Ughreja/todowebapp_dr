from django.urls import path
from auth_app import views

urlpatterns = [
    path("signup", views.SignupUserView.as_view(), name="signup-user"),
    path('login', views.LoginUserView.as_view(), name="login-user"),
    path('logout', views.LogoutUserView.as_view(), name="logout-user"),
    path('isLoggedIn', views.IsLoggedinView.as_view(), name="isLoggedIn"),
    path('checkPassword', views.CheckPasswordView.as_view(), name="check-password"),
    path('sendChangePasswordLink', views.SendChangePasswordLinkView.as_view(), name="send-change-password-link"),
]

