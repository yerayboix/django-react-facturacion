# Generated by Django 5.0.4 on 2024-09-25 16:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('almacenaje_libros_api', '0002_book_author'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='discount',
        ),
        migrations.RemoveField(
            model_name='book',
            name='price',
        ),
    ]
