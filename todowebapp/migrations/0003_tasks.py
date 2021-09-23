# Generated by Django 3.0.7 on 2021-08-04 17:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('todowebapp', '0002_auto_20210803_2127'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('pk_task', models.BigAutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=50)),
                ('note', models.TextField()),
                ('priority', models.IntegerField(default=0)),
                ('due_date', models.DateField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('when_created', models.DateTimeField(auto_now_add=True)),
                ('when_created_timestamp', models.CharField(max_length=50)),
                ('when_deleted', models.DateTimeField(blank=True, null=True)),
                ('when_deleted_timestamp', models.CharField(blank=True, max_length=50, null=True)),
                ('list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]