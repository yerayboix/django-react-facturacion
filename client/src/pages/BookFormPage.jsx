import { useForm } from 'react-hook-form'
import { createBook, getAllBooks } from '../api/books.api'
import { useNavigate, useParams } from 'react-router-dom'
import { Toaster, toast } from 'sonner'

export function BookFormPage ({ sharedBooks, sharedBooksState }) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    const res = await createBook(data)
    const books = await getAllBooks()
    sharedBooksState(books.data)
    toast.success('Libro añadido con éxito', {
      position: 'top-right',
      icon: '📚'
    })
    console.log(data)
  }

  return (
    <div>
      <form className='form-group' onSubmit={handleSubmit(onSubmit)}>
        <div className='row m-auto'>
          <div className='col-auto'>
            <input
              className='form-control'
              type='text'
              placeholder='Title'
              {...register('title', { required: true })}
            />
            {errors.title && <span style={{ color: 'red' }}>Campo requerido</span>}
          </div>
          <div className='col-auto'>
            <input
              className='form-control'
              type='number'
              placeholder='Amount'
              {...register('amount', { required: true })}
            />
            {errors.amount && <span style={{ color: 'red' }}>Campo requerido</span>}
          </div>
          <div className='col-auto'>
            <input
              className='form-control'
              type='number'
              placeholder='Price'
              {...register('price', { required: true })}
            />
            {errors.price && <span style={{ color: 'red' }}>Campo requerido</span>}
          </div>
          <div className='col-auto'>
            <input
              className='form-control'
              type='number'
              placeholder='Discount'
              {...register('discount', { required: true })}
            />
            {errors.discount && <span style={{ color: 'red' }}>Campo requerido</span>}
          </div>
          <div className='col-auto'>
            <button className='btn btn-primary' type='submit'>Save</button>
          </div>
        </div>
      </form>
    </div>
  )
}
