# Generated by Django 3.0.7 on 2021-08-04 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todowebapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lists',
            name='background_color',
            field=models.IntegerField(default=1),
        ),
    ]