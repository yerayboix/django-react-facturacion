import axios from 'axios'

const booksApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/almacenaje/api/v1/books/'
})

export const getAllBooks = () => booksApi.get('/')

export const createBook = (book) => booksApi.post('/', book)

export const deleteBook = (id) => booksApi.delete(`/${id}`, id)

export const updateBook = (book) => booksApi.put(`/${book.id}/`, book)
