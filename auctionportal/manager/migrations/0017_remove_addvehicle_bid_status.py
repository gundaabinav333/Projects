# Generated by Django 4.2.4 on 2023-09-29 11:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0016_remove_addvehicle_bid_end_day'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='addvehicle',
            name='bid_status',
        ),
    ]
