import React, { useState, useEffect } from 'react'
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown,
  DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, useDisclosure,
  Pagination, Input
} from '@nextui-org/react'
import { DeleteIcon } from '../icons/DeleteIcon'
import { EditIcon } from '../icons/EditIcon'
import { IconMenuDown } from '../icons/IconMenuDown'
import { ModalBookEdit } from './ModalBookEdit'
import { SearchIcon, ChevronDownIcon } from './Icons'

export function BookTable ({ headers, contents, handleBookDelete, sharedBooksState, handleBookSave }) {
  const [selectedBook, setSelectedBook] = useState(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [page, setPage] = useState(1)
  const rowsPerPage = 6
  const [books, setBooks] = useState(contents)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setBooks(contents)
  }, [contents])

  useEffect(() => {
    if (books.length < (page - 1) * rowsPerPage) {
      setPage(page - 1)
    }
  }, [books.length, page])

  useEffect(() => {
    setPage(1)
  }, [searchTerm])

  const filteredBooks = React.useMemo(() => {
    return books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm, books])

  const displayedBooks = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredBooks.slice(start, end)
  }, [page, filteredBooks])

  const handleEditClick = (book) => {
    console.log(book)
    setSelectedBook(book)
  }

  const handleClose = () => {
    setSelectedBook(null)
  }

  const deleteBook = async (bookId, bookTitle) => {
    await handleBookDelete(bookId, bookTitle)
    setBooks(books.filter(book => book.id !== bookId))
  }

  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'
  const iconClassesDanger = 'text-xl pointer-events-none flex-shrink-0'
  const centerStyle = { textAlign: 'center' }

  return (
    <>
      
      <Table
        isHeaderSticky
        aria-label='Example table with client side pagination'
        bottomContent={
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
          </div>
        }
        classNames={{
          wrapper: 'min-h-[222px]'
        }}
      >
        <TableHeader contents={headers} aria-label='Book list'>
          <TableColumn style={centerStyle}>IMAGEN</TableColumn>
          <TableColumn style={centerStyle}>ID</TableColumn>
          <TableColumn style={centerStyle}>TÍTULO</TableColumn>
          <TableColumn style={centerStyle}>AUTOR</TableColumn>
          <TableColumn style={centerStyle}>CANTIDAD</TableColumn>
          <TableColumn style={centerStyle}>PRECIO €</TableColumn>
          <TableColumn style={centerStyle}>DESCUENTO %</TableColumn>
          <TableColumn style={centerStyle}>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody items={displayedBooks}>
          {displayedBooks.map((content) => (
            <TableRow key={content.id} className='hover:bg-gray-200 text-center'>
              <TableCell style={{ display: 'flex', justifyContent: 'center' }}>
                <img src='/src/assets/images/Shambala.jpg' style={{ width: 'auto', height: '100px', borderRadius: '0.3rem' }} />
              </TableCell>
              {Object.values(content).map((value, index) => (
                <TableCell style={centerStyle} key={index}>{value}</TableCell>
              ))}
              <TableCell style={centerStyle}>
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      size='sm'
                      color='transparent'
                      isIconOnly
                      aria-label='Actions'
                    >
                      <ChevronDownIcon />
                      {/* <IconMenuDown className={iconClasses} style={{ fontSize: '2.5rem' }} /> */}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant='faded' aria-label='Dropdown menu with description'>
                    <DropdownSection title='Acciones' showDivider>
                      <DropdownItem
                        onPress={onOpen}
                        key='edit'
                        description='Editar información del libro'
                        startContent={<EditIcon className={iconClasses} />}
                        onClick={() => handleEditClick(content)}
                        aria-label='Edit book'
                      >
                        Editar libro
                      </DropdownItem>
                    </DropdownSection>
                    <DropdownSection title='Zona peligrosa'>
                      <DropdownItem
                        key='delete'
                        className='text-danger'
                        color='danger'
                        description='Borrar permanentemente el libro y sus datos'
                        startContent={<DeleteIcon className={`${iconClassesDanger} text-danger`} />}
                        onClick={() => deleteBook(content.id, content.title)}
                        aria-label='Delete book'
                      >
                        Borrar libro
                      </DropdownItem>
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedBook && (
        <ModalBookEdit
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          handleSave={handleBookSave}
          item={selectedBook}
          handleClose={handleClose}
        />
      )}
    </>
  )
}
