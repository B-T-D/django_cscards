# Generated by Django 3.0.8 on 2020-09-25 22:16

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('cards', '0003_card_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='date_added',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='card',
            name='last_modified',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='card',
            name='last_reviewed',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='card',
            name='times_right',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='card',
            name='times_wrong',
            field=models.PositiveSmallIntegerField(default=0),
        ),
    ]
