/* eslint-disable react/jsx-key */
import React from 'react'
import { Card, CardFooter, CardBody, CardHeader, Image, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Tooltip, Chip } from '@nextui-org/react'
import { DeleteIcon } from '../icons/DeleteIcon'
import { EditIcon } from '../icons/EditIcon'
import { BoxIcon, SearchIcon, ChevronDownIcon, IconMoneyEuroCircleFill, IconDropboxCircle } from './Icons'

export function BookItem ({ book, handleBookEdit, handleBookDelete, onOpen }) {

  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'
  const iconClassesDanger = 'text-xl pointer-events-none flex-shrink-0'
  const centerStyle = { textAlign: 'center' }
  const truncatedTitle = book.title.length > 10 ? book.title.substring(0, 15) + '...' : book.title;

  const handleEdit = (book) => {
    handleBookEdit(book)
  }

  return (
    <Card className='flex-col justify-start rounded-md p-0 border-0 shadow-none' style={{ width: '200px', minHeight: '250px', backgroundColor: 'transparent' }}>
      <Image
        alt='Card background'
        className='w-full object-cover rounded-md'
        src='/src/assets/images/Shambala.jpg'
        width={'100%'}
      />
      <CardHeader className='flex-col p-1' style={{ display: 'flex', alignSelf: 'flex-start' }}>
        <Tooltip content={book.title} color='primary' placement='top'>
          <h4 className='font-bold justify-start py-0' style={{ alignSelf: 'flex-start' }}>{truncatedTitle}</h4>
        </Tooltip>
        <small className='justify-start text-default-500' style={{ alignSelf: 'flex-start' }}>{book.author}</small>
      </CardHeader>
      <CardBody className='flex-col p-1 py-0 h-full' style={{ display: 'flex', justifyContent: 'flex-center', height: '100%' }}>
        <div className='flex gap-1'>
          <Chip
            startContent={<IconMoneyEuroCircleFill />}
            variant="flat"
            color="success"
          >
            {book.price}
          </Chip>
          <Chip
            startContent={<IconDropboxCircle />}
            variant="bordered"
            color="warning"
          >
            {book.amount} unidades
          </Chip>
        </div>
      </CardBody>
      <CardFooter className='flex-col p-1' style={{ display: 'flex', alignSelf: 'flex-start' }}>
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
                onClick={() => handleBookDelete(book.id, book.title)}
                aria-label='Delete book'
              >
                Borrar libro
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </CardFooter>
    </Card >
  )
}
