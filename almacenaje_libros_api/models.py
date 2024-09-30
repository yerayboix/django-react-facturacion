from django.db import models

# Create your models here.
'''
BOOKS
'''
class Book(models.Model):
    title = models.CharField(max_length=256)
    author = models.CharField(max_length=256, default='')
    amount = models.IntegerField(default=0)
    isbn = models.CharField(max_length=256, default='')
    pvp = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['pk']
        verbose_name = "Book"
        verbose_name_plural = "Books"

'''
BANK ACCOUNTS
'''
class BankAccount(models.Model):
    name = models.CharField(max_length=256, default='')
    entity = models.CharField(max_length=256, default='')
    account_number = models.CharField(max_length=256, default='')
    
    def __str__(self):
        return self.name

    class Meta:
        ordering = ['pk']
        verbose_name = "Cuenta Bancaria"
        verbose_name_plural = "Cuentas Bancarias"

'''
INVOICES
'''
# Solamente para libreria
class Invoice(models.Model):
    client_name = models.CharField(max_length=256, default='')
    client_direction = models.CharField(max_length=256, default='')
    nif = models.CharField(max_length=256, default='') # Opcional para pedidos de clientes
    date = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=256, default='')
    sum_total = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) # Total sin aplicar nada
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) # % de descuento
    total_discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) # Total con descuento
    vat = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) # % de IVA
    total_vat = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) # Total con IVA
    equivalence = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) # % a aplicar de equivalencia
    total_equivalence = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) # Total de equivalencia
    total_invoice = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) # Resultado final
    invoice_number = models.CharField(max_length=256, default='')

    def __str__(self):
        return self.invoice_number

    class Meta:
        ordering = ['pk']
        verbose_name = "Factura"
        verbose_name_plural = "Facturas"

class InvoiceLine(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, null=True, blank=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField(default=0)
    pvp = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) # Total price - quantity - discount

    def __str__(self):
        return f"{self.book.title} - {self.quantity} unidades"

    class Meta:
        ordering = ['pk']
        verbose_name = "Línea de Factura"
        verbose_name_plural = "Líneas de Factura"


class Order(models.Model):
    ORDER_TYPES = (
        ('F', 'Factura'),
        ('P', 'Pedido'),
        ('W', 'Web')
    )

    order_type = models.CharField(max_length=1, choices=ORDER_TYPES, default='F')
    order_number = models.CharField(max_length=256, default='') # P-YEAR-ID para libreria, F-YEAR-ID para clientes
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, null=True, blank=True)
    comision = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    payment_method = models.CharField(max_length=256, default='')
    payment_date = models.DateField(null=True, blank=True)
    total_without_discount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    total_received_bank = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    bank_account = models.ForeignKey(BankAccount, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.order_number

    class Meta:
        ordering = ['pk']
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"