import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'

export function ModalBookEdit ({ isOpen, onOpenChange, handleSave, item, handleClose }) {
  const [formData, setFormData] = useState({ ...item })
  const [isLoadingState, setIsLoadingState] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async () => {
    setIsLoadingState(false)
    await handleSave(formData)
    setIsLoadingState(true)
    onOpenChange(false)
    handleClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='top-center'
      onClose={handleClose}
      backdrop='blur'
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
                label='Precio €'
                placeholder='Precio del libro por unidad'
                variant='bordered'
                value={formData.price}
                name='price'
                type='number'
                onChange={handleChange}
                /><Input
                  autoFocus
                  label='Descuento %'
                  placeholder='Descuento del libro por unidad'
                  variant='bordered'
                  value={formData.discount}
                  name='discount'
                  type='number'
                  onChange={handleChange}
                  />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='flat' onClick={handleClose} onPress={onClose}>
                Cerrar
              </Button>
              <Button color='primary' onClick={handleSubmit} isLoading={isLoadingState}>
                Guardar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
