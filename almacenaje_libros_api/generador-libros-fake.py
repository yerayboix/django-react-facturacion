import requests
import random
import string

# URL de tu API
url = "http://127.0.0.1:8000/api/v1/books/"

# Genera un ISBN aleatorio
def generate_isbn():
    return ''.join(random.choices(string.digits, k=13))

# Genera datos aleatorios para el libro
def generate_book_data(i):
    return {
        "title": f"Book Title {i}",
        "author": f"Author {i}",
        "amount": random.randint(10, 1000),  # Cantidad aleatoria de 10 a 1000
        "pvp": random.randint(10, 30),  # Precio por unidad aleatorio de 10 a 30
        "isbn": generate_isbn()
    }

# Crea y envía 100 libros
for i in range(1, 101):
    book_data = generate_book_data(i)
    response = requests.post(url, json=book_data)
    if response.status_code == 201:
        print(f"Book {i} created successfully!")
    else:
        print(f"Failed to create Book {i}: {response.status_code} - {response.text}")
