import { deleteBook } from '../api/books.api';
import { useNavigate } from 'react-router-dom';

export function BookCard({ book }) {

    const navigate = useNavigate();

    return (
        <div>
            <h1 
                onClick={() => {
                navigate(`/books/${book.id}`)
            }}
            >{book.title}</h1>
            <p>Cantidad restante: {book.amount}</p>
            <p>Precio: {book.price}€ - {book.discount}% de descuento</p>
        </div>
    )
}
