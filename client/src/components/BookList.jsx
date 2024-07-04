/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import { deleteBook, getAllBooks, updateBook } from '../api/books.api'
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown,
  DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, useDisclosure,
  Pagination, Input
} from '@nextui-org/react'
import { BookTable } from './BookTable'
import { BookFormPage } from '../pages/BookFormPage'
import { toast } from 'react-hot-toast'
import { BookItem } from './BookItem'
import { ModalBookEdit } from './ModalBookEdit'
import { SearchIcon, ChevronDownIcon } from './Icons'

export function BookList () {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [page, setPage] = useState(1)
  const rowsPerPage = 20
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadBooks()
  }, [])

  useEffect(() => {
    if (books.length < (page - 1) * rowsPerPage) {
      setPage(page - 1)
    }
  }, [books.length, page])

  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  async function loadBooks () {
    const res = await getAllBooks()
    console.log(res.data)
    setBooks(res.data)
  }

  const handleBookEdit = (book) => {
    console.log(book)
    setSelectedBook(book)
  }

  const handleClose = () => {
    setSelectedBook(null)
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

  const filteredBooks = React.useMemo(() => {
    return books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm, books])

  const displayedBooks = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredBooks.slice(start, end)
  }, [page, filteredBooks])

  

  return (
    <div className='flex flex-col p-6 md:px-10 max-w-[60rem] mx-auto min-h-dvh'>
      <Input
        label='Buscar por título'
        clearable
        bordered
        fullWidth
        color='seconday'
        size='lg'
        placeholder='Escribe para buscar...'
        classNames={{
          label: 'text-black/50 dark:text-white/90',
          input: [
            'bg-transparent',
            'text-black/90 dark:text-white/90',
            'placeholder:text-default-700/50 dark:placeholder:text-white/60'
          ],
          inputWrapper: [
            'shadow-xl',
            'mb-1',
            'bg-white dark:bg-default/70',
            'shadow-lg ring-0 ring-offset-0',
            '!cursor-text'
          ]
        }}
        startContent={
          <SearchIcon className='mb-1 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
        }
        isClearable
        onChange={(e) => setSearchTerm(e.target.value)}
        onClear={() => setSearchTerm('')}
      />
      <div className='class-name' style={{ display: 'flex', justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
          {displayedBooks.map((book) => (
              <div className='p-4' key={book.id}>
                <BookItem book={book} handleBookEdit={handleBookEdit} handleBookDelete={handleBookDelete} onOpen={onOpen} onOpenChange={onOpenChange} />
              </div>
          ))}
        </div>
      </div>
      { displayedBooks.length > 0 && (
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='primary'
            page={page}
            total={Math.ceil(filteredBooks.length / rowsPerPage)}
            onChange={(page) => setPage(page)}
          />
          {selectedBook && (
              <ModalBookEdit
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                handleSave={handleBookSave}
                item={selectedBook}
                handleClose={handleClose}
              />
          )}
        </div>
      )}
    </div>
    
  )
}
