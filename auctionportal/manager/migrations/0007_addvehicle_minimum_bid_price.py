# Generated by Django 4.2.4 on 2023-09-29 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0006_rename_feedback_feedback_userfeedback'),
    ]

    operations = [
        migrations.AddField(
            model_name='addvehicle',
            name='minimum_bid_price',
            field=models.CharField(default='5000', max_length=30),
        ),
    ]