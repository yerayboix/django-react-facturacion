import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Input, Link } from '@nextui-org/react'

export function ModalBookEdit ({ isOpen, onOpenChange, handleSave, item }) {
  const [formData, setFormData] = useState({ ...item })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = () => {
    // handleSave(formData)
    console.log('AAAAAAA')
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='top-center'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Editando libro</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label='Título'
                placeholder='Título del libro'
                variant='bordered'
                value={formData.title}
                name='title'
                onChange={handleChange}
              />
              <Input
                autoFocus
                label='Cantidad'
                placeholder='Cantidad de libros en almacén'
                variant='bordered'
                value={formData.amount}
                name='amount'
                type='number'
                onChange={handleChange}
              /><Input
                autoFocus
                label='Precio'
                placeholder='Precio del libro por unidad'
                variant='bordered'
                value={formData.price}
                name='price'
                type='number'
                onChange={handleChange}
                /><Input
                  autoFocus
                  label='Descuento'
                  placeholder='Descuento del libro por unidad'
                  variant='bordered'
                  value={formData.discount}
                  name='discount'
                  type='number'
                  onChange={handleChange}
                  />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='flat' onPress={onClose}>
                Close
              </Button>
              <Button color='primary' onClick={handleSubmit} onPress={onClose}>
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
