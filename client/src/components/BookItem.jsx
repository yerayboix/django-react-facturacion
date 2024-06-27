/* eslint-disable react/jsx-key */
import React from 'react'
import { Card, CardFooter, Image, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, useDisclosure } from '@nextui-org/react'
import { DeleteIcon } from '../icons/DeleteIcon'
import { EditIcon } from '../icons/EditIcon'
import { BoxIcon, SearchIcon, ChevronDownIcon } from './Icons'

export function BookItem ({ book, handleBookEdit, handleBookDelete, onOpen }) {

  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'
  const iconClassesDanger = 'text-xl pointer-events-none flex-shrink-0'
  const centerStyle = { textAlign: 'center' }

  const handleEdit = (book) => {
    handleBookEdit(book)
  }

  return (
    <Card className='flex-col justify-start  overflow-visible rounded-md p-0 shadow-2xl border-1 border-black-500'>
      <Image
        alt='Card background'
        className='w-full object-cover rounded-md'
        src='/src/assets/images/Shambala.jpg'
        width={270}
      />
      <CardFooter className='flex-col p-1' style={{ display: 'flex', alignSelf: 'flex-start' }}>
        <h4 className='font-bold justify-start py-0' style={{ alignSelf: 'flex-start' }}>{book.title}</h4>
        <small className='justify-start text-default-500' style={{ alignSelf: 'flex-start' }}>{book.author}</small>
        <p className='mt-4 text-sm' style={{ display: 'flex', alignSelf: 'flex-start' }}>
          Precio: {book.price} €/u
        </p>
        <p className='mt-0 text-sm' style={{ display: 'flex', alignSelf: 'flex-start' }}>
          Stock: {book.amount} unidades
        </p>
        <small className='text-default-500 mt-0' style={{ fontSize: '60%', color: '#c00505', alignSelf: 'flex-start' }}>{book.discount} % descuento</small>
        <Dropdown>
          <DropdownTrigger>
            <Button
              size='sm'
              color='primary'
              isIconOnly
              aria-label='Actions'
              className='mt-2 w-full rounded-md'
            >
              Acciones
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
                onClick={() => handleEdit(book)}
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
      </CardFooter>
    </Card>
  )
}
