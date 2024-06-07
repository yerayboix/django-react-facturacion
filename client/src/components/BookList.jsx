/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import { deleteBook, getAllBooks, updateBook } from '../api/books.api'
import { Table } from './Table'
import { BookFormPage } from '../pages/BookFormPage'
import { Toaster, toast } from 'sonner'
import { Link } from 'react-router-dom'
import { left } from '@popperjs/core'

export function BookList () {
  const [books, setBooks] = useState([])
  const [bookHeaders, setBookHeaders] = useState([])

  async function loadBooks () {
    const res = await getAllBooks()
    console.log(res.data)
    setBooks(res.data)
    if (res.data.length > 0) {
      setBookHeaders(Object.keys(res.data[0]))
    }
  }

  async function handleBookDelete (bookId, bookTitle) {
    console.log(bookId)
    await deleteBook(bookId)
    toast.success(`Libro: <b>${bookTitle}</b> eliminado con éxito`, {
      position: 'top-right'
    })
    loadBooks()
  }

  async function handleBookSave (updatedItem) {
    // Lógica para actualizar el elemento en el estado o hacer una llamada API
    console.log('Elemento actualizado:', updatedItem)
    const res = await updateBook(updatedItem)
    console.log(res)
    if (res.status === 200) {
      toast.success('Libro actualizado con éxito', {
        position: 'top-right'
      })
      loadBooks()
    } else {
      toast.error('Error al actualizar el libro', {
        position: 'top-right'
      })
    }
  }

  useEffect(() => {
    loadBooks()
  }, [])

  return (
    <div className='class-name'>
      <div className='table-responsive'>
        <Link to='/books-create' style={{ width: '100%', textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
          <button className='btn btn-primary' style={{ display: 'flex', whiteSpace: 'break-spaces' }}><img src='src/assets/icons/add.svg' style={{ width: 'auto' }} /> Añadir libro</button>
        </Link>
        {bookHeaders.length > 0
          ? (
            <Table
              headers={bookHeaders}
              contents={books}
              handleBookDelete={handleBookDelete}
              handleBookSave={handleBookSave}
            />
            )
          : (
            <>
              <h1>No hay libros</h1>
            </>
            )}
      </div>
      <div className='class-name' style={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto', margiRight: 'auto' }}>
        <BookFormPage sharedBooks={books} sharedBooksState={setBooks} />
      </div>
    </div>
  )
}
