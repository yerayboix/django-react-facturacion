# Generated by Django 5.0.4 on 2024-09-30 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('almacenaje_libros_api', '0007_order_bank_account'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='order_type',
            field=models.CharField(choices=[('F', 'Factura'), ('P', 'Pedido'), ('W', 'Web')], default='F', max_length=1),
        ),
    ]
