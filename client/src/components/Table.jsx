import '../css/table.css'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { ModalBookEdit } from './ModalBookEdit'
import { updateBook } from '../api/books.api'
import { toast } from 'react-hot-toast'

export function Table ({ headers, contents, handleBookSave, handleBookDelete }) {
  const [showModal, setShowModal] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)

  const handleShowModal = (item) => {
    setCurrentItem(item)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setCurrentItem(null)
  }

  return (
    <div className='' style={{ display: 'flex', justifyContent: 'center' }}>
      <table className='table table-hover table-custom'>
        <thead>
          <tr>
            <th className='border border-slate-600 tableHeader'>Caratula</th>
            {headers.map((header) => (
              <th className='border border-slate-600 tableHeader' key={header}>{header}</th>
            ))}
            <th className='border border-slate-600'>Buttons</th>
          </tr>
        </thead>
        <tbody className=''>
          {contents.map((content, index) => (
            <tr className='hover:bg-sky-700 hover:text-white' key={index}>
              <td className='border border-slate-600 text-center'><img src='/src/assets/images/Shambala.jpg' style={{ width: 'auto', height: '100px', borderRadius: '0.3rem' }} /></td>
              {Object.values(content).map((value, index) => (
                <td key={index} className='border border-slate-600 text-center'>{value}</td>
              ))}
                <td className='border border-slate-600 text-center'>
                  <Button variant='warning' size='sm' className='me-1' style={{ minWidth: '69px', marginBottom: '1px' }} onClick={() => handleShowModal(content)}>
                    Editar
                  </Button>
                  <Button variant='danger' size='sm' style={{ minWidth: '69px', marginBottom: '1px' }} onClick={() => handleBookDelete(content.id, content.title)}>
                    Eliminar
                  </Button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentItem && (
        <ModalBookEdit
          show={showModal}
          handleClose={handleCloseModal}
          item={currentItem}
          handleSave={handleBookSave}
        />
      )}
    </div>
  )
}
