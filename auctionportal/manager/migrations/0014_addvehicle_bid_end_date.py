# Generated by Django 4.2.4 on 2023-09-29 11:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0013_remove_addvehicle_bid_end_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='addvehicle',
            name='bid_end_date',
            field=models.CharField(default='notspecified', max_length=50),
        ),
    ]
