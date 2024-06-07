import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import Figure from 'react-bootstrap/Figure'

export function ModalBookEdit ({ show, handleClose, handleSave, item }) {
  const [formData, setFormData] = useState({ ...item })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = () => {
    handleSave(formData)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header style={{ justifyContent: 'center' }}>
        <Modal.Title style={{ paddingLeft: '20px', fontSize: '2rem' }}>Editar libro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'center', paddingTop: '5px' }}>
            <Figure>
              <Figure.Image
                style={{ borderRadius: '0.5rem', maxHeight: '475px', minHeight: '275px', width: 'auto', boxShadow: '-10px 1rem 1rem 1px rgb(0 0 0 / 37%)' }}
                width={171}
                height={180}
                alt='191x180'
                src='src/assets/images/Shambala.jpg'
              />
            </Figure>
          </Col>
          <Col style={{ paddingTop: '30px' }}>
            <Form>
              <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type='number'
                  name='amount'
                  value={formData.amount}
                  onChange={handleChange}
                />
              </Form.Group>
              <div style={{ display: 'flex', flexWrap: 'no-wrap', justifyContent: 'space-between' }}>
                <Form.Group className='me-1'>
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type='number'
                    step='0.01'
                    name='price'
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Descuento</Form.Label>
                  <Form.Control
                    type='number'
                    name='discount'
                    value={formData.discount}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant='primary' onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
