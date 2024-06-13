/* eslint-disable react/jsx-key */
import React from 'react'
import { Card, CardFooter, Image, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, useDisclosure } from '@nextui-org/react'
import { DeleteIcon } from '../icons/DeleteIcon'
import { EditIcon } from '../icons/EditIcon'
import { BoxIcon, SearchIcon, ChevronDownIcon } from './Icons'

export function BookItem (book) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'
  const iconClassesDanger = 'text-xl pointer-events-none flex-shrink-0'
  const centerStyle = { textAlign: 'center' }

  return (
    <Card className='p-1 flex-col items-center'>
      <Image
        isBlurred
        alt='Card background'
        className='object-cover rounded-xl'
        src='/src/assets/images/Shambala.jpg'
        width={140}
      />
      <CardFooter className='flex-col items-center p-1'>
        <h4 className='font-bold text-large text-left py-0' style={{maxWidth: '140px'}}>Revisar cuando el titulo es gigante</h4>
        <small className='text-default-500'>{book.book.author}</small>
        <p className='mt-0 font-bold flex-nowrap' style={{ display: 'flex', alignItems: 'flex-end' }}>
          <BoxIcon width={30} height='auto' style={{ paddingTop: '2px', marginRight: '5px' }} />
          {book.book.amount} - {book.book.price} €/u
        </p>
        <small className='text-default-500 mt-0' style={{ fontSize: '60%', color: '#c00505' }}>{book.book.discount} % descuento</small>
        <Dropdown>
          <DropdownTrigger>
            <Button
              size='sm'
              color='primary'
              isIconOnly
              aria-label='Actions'
              className='mt-2 w-full'
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
      </CardFooter>
    </Card>
  )
}
