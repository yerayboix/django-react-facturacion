# Generated by Django 5.0.4 on 2024-06-13 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("almacenaje_libros_api", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="book",
            name="author",
            field=models.CharField(default="", max_length=256),
        ),
    ]
