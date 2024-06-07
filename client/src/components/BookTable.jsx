import React, { useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, useDisclosure } from '@nextui-org/react'
import { DeleteIcon } from '../icons/DeleteIcon'
import { EditIcon } from '../icons/EditIcon'
import { IconMenuDown } from '../icons/IconMenuDown'
import { ModalBookEdit } from './ModalBookEdit'

export function BookTable ({ headers, contents, handleBookDelete, handleBookSave }) {
  const [showModal, setShowModal] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleEditClick = (book) => {
    console.log(book)
    setSelectedBook(book)
  }

  const handleModalClose = () => {
    isOpen(false)
    setSelectedBook(null)
  }

  const handleSave = (book) => {
    handleBookSave(book)
    handleModalClose()
  }

  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'
  const centerStyle = { textAlign: 'center' }

  return (
    <>
    
      <Table>
        <TableHeader columns={headers}>
          <TableColumn style={centerStyle}>IMAGEN</TableColumn>
          <TableColumn style={centerStyle}>TÍTULO</TableColumn>
          <TableColumn style={centerStyle}>ID</TableColumn>
          <TableColumn style={centerStyle}>CANTIDAD</TableColumn>
          <TableColumn style={centerStyle}>PRECIO</TableColumn>
          <TableColumn style={centerStyle}>DESCUENTO</TableColumn>
          <TableColumn style={centerStyle}>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody items={contents}>
          {contents.map((content, index) => (
            <TableRow key={index} className='hover:bg-gray-200 text-center'>
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
                      color='transparent'
                      isIconOnly
                      aria-label='Like'
                    >
                      <IconMenuDown className={iconClasses} style={{ fontSize: '2.5rem' }} />
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
                        startContent={<DeleteIcon className={`${iconClasses} text-danger`} />}
                        onClick={() => handleBookDelete(content)}
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
          handleSave={handleSave}
          item={selectedBook}
        />
      )}
    </>
  )
}
