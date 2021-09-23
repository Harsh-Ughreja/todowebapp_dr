from django.db import models
from django.contrib.auth.models import User
from django.db.models import CASCADE

# Create your models here.

class Lists(models.Model):

    pk_list = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=CASCADE)
    list_name = models.CharField(max_length=30)
    background_color = models.IntegerField(default=1)
    is_active = models.BooleanField(default=True)
    when_created = models.DateTimeField(auto_now_add=True)
    when_created_timestamp = models.CharField(max_length=50, blank=False, null=False)
    when_deleted = models.DateTimeField(blank=True, null=True)
    when_deleted_timestamp = models.CharField(max_length=50, blank=True, null=True)

class Tasks(models.Model):

    pk_task = models.BigAutoField(primary_key=True)
    list = models.ForeignKey(Lists, on_delete=CASCADE)
    title = models.CharField(max_length=50)
    note = models.TextField()
    priority = models.IntegerField(default=0)
    due_date = models.DateField(blank=True, null=True)
    is_completed = models.BooleanField(default=0)
    is_active = models.BooleanField(default=True)
    when_created = models.DateTimeField(auto_now_add=True)
    when_created_timestamp = models.CharField(max_length=50, blank=False, null=False)
    when_deleted = models.DateTimeField(blank=True, null=True)
    when_deleted_timestamp = models.CharField(max_length=50, blank=True, null=True)