/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react'
import { deleteBook, getAllBooks, updateBook } from '../api/books.api'
import { BookTable } from './BookTable'
import { BookFormPage } from '../pages/BookFormPage'
import { toast } from 'react-hot-toast'
import { BookItem } from './BookItem'

export function BookList () {
  const [books, setBooks] = useState([])
  const [bookHeaders, setBookHeaders] = useState([])
  const [pages, setPages] = useState(1)
  const rowsPerPage = 6

  async function loadBooks () {
    const res = await getAllBooks()
    console.log(res.data)
    setBooks(res.data)
    if (res.data.length > 0) {
      setBookHeaders(Object.keys(res.data[0]))
      console.log(Object.keys(res.data[0]))
    }
  }

  async function handleBookDelete (bookId, bookTitle) {
    console.log(bookId)
    await deleteBook(bookId)
    await loadBooks()
    toast.success(`Libro: ${bookTitle} eliminado con éxito`, {
      position: 'top-right',
      icon: '🗑️'
    })
  }

  async function handleBookSave (updatedItem) {
    // Lógica para actualizar el elemento en el estado o hacer una llamada API
    console.log('Elemento actualizado:', updatedItem)
    const res = await updateBook(updatedItem)
    console.log(res)
    if (res.status === 200) {
      toast.success('Libro actualizado con éxito', {
        position: 'top-right',
        ariaLabel: 'Libro actualizado con éxito'
      })
      loadBooks()
    } else {
      toast.error('Error al actualizar el libro', {
        position: 'top-right',
        ariaLabel: 'Error al actualizar el libro'
      })
    }
  }

  useEffect(() => {
    loadBooks()
  }, [])

  useEffect(() => {
    setPages(Math.ceil(books.length / rowsPerPage))
  }, [books])

  return (
    <div className='flex flex-col p-6 md:px-10 max-w-[60rem] mx-auto min-h-dvh'>
      <div className='table-responsive'>
        {bookHeaders.length > 0
          ? (
            <BookTable
              headers={bookHeaders}
              contents={books}
              handleBookDelete={handleBookDelete}
              handleBookSave={handleBookSave}
              ariaLabel='Book list'
            />
            )
          : (
            <>
              <h1>No hay libros</h1>
            </>
            )}
      </div>
      <div className='class-name' style={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
        <BookFormPage sharedBooks={books} sharedBooksState={setBooks} />
      </div>
      <div className='class-name' style={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
        {bookHeaders.length > 0
          ? (
            <BookItem book={books[0]} handleBookDelete={handleBookDelete} />
            )
          : (
            <>
              <h1>No hay libros</h1>
            </>
            )}
      </div>
    </div>
  )
}
