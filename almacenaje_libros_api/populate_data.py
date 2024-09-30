import random
from decimal import Decimal
from datetime import datetime
from .models import Book, BankAccount, Invoice, InvoiceLine, Order

# Crear 100 libros
def generate_books():
    for i in range(1, 101):
        book = Book.objects.create(
            title=f"Libro {i}",
            author=f"Autor {i}",
            amount=random.randint(10, 100),
            isbn=f"ISBN-{random.randint(1000000000000, 9999999999999)}",
            pvp=round(Decimal(random.uniform(10, 100)), 2)
        )
        print(f"Libro {book.title} creado.")

# Crear una única cuenta bancaria
def generate_bank_account():
    account = BankAccount.objects.create(
        name="Cuenta Única",
        entity="Banco XYZ",
        account_number="ES7621000418450200051332"
    )
    print(f"Cuenta bancaria {account.name} creada.")
    return account

# Crear 60 pedidos y facturas
def generate_orders_and_invoices(bank_account):
    books = list(Book.objects.all())
    for i in range(1, 61):
        # Crear factura
        invoice = Invoice.objects.create(
            client_name=f"Cliente {i}",
            client_direction=f"Dirección {i}",
            nif=f"NIF-{random.randint(10000000, 99999999)}X",
            date=datetime.now().date(),
            phone_number=f"+3412345678{i}",
            sum_total=Decimal(0),
            discount=Decimal(random.uniform(0, 10)),
            vat=Decimal(21),  # IVA del 21%
        )
        
        # Crear líneas de factura
        num_lines = random.randint(1, 5)  # De 1 a 5 líneas por factura
        sum_total = Decimal(0)
        for _ in range(num_lines):
            book = random.choice(books)
            quantity = random.randint(1, 10)
            pvp = book.pvp
            price = pvp * quantity
            discount = Decimal(random.uniform(0, 10))
            amount = price - (price * discount / 100)
            InvoiceLine.objects.create(
                invoice=invoice,
                book=book,
                quantity=quantity,
                pvp=pvp,
                price=price,
                discount=discount,
                amount=amount
            )
            sum_total += amount

        # Actualizar totales de la factura
        invoice.sum_total = sum_total
        invoice.total_discount = sum_total * (invoice.discount / 100)
        invoice.total_vat = (sum_total - invoice.total_discount) * (invoice.vat / 100)
        invoice.total_invoice = (sum_total - invoice.total_discount) + invoice.total_vat
        invoice.save()

        # Crear pedido
        order = Order.objects.create(
            order_type='P',
            order_number=f"P-{datetime.now().year}-{i:03d}",
            invoice=invoice,
            comision=Decimal(random.uniform(0, 5)),
            payment_method="Transferencia Bancaria",
            payment_date=datetime.now().date(),
            total_without_discount=invoice.sum_total,
            total_received_bank=invoice.total_invoice,
            bank_account=bank_account
        )
        print(f"Pedido {order.order_number} creado con factura {invoice.invoice_number}.")

# Ejecutar el script
def run():
    generate_books()  # Crear 100 libros
    bank_account = generate_bank_account()  # Crear una cuenta bancaria
    generate_orders_and_invoices(bank_account)  # Crear 60 pedidos con facturas
