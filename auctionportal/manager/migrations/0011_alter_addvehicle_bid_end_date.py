# Generated by Django 4.2.4 on 2023-09-29 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0010_alter_addvehicle_bid_end_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='addvehicle',
            name='bid_end_date',
            field=models.CharField(default='25-09-2023'),
        ),
    ]