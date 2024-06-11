import { useForm } from 'react-hook-form'
import { createBook, getAllBooks } from '../api/books.api'
import { toast } from 'react-hot-toast'

export function BookFormPage ({ sharedBooks, sharedBooksState }) {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await createBook(data)

      if (res.status === 200 || res.status === 201) {
        const books = await getAllBooks()
        sharedBooksState(books.data)
        toast.success('Libro añadido con éxito', {
          position: 'top-right',
          icon: '📚'
        })
        console.log(data)
      } else {
        // Handle unexpected status codes
        toast.error(`Unexpected status code: ${res.status}`, {
          position: 'top-right',
          icon: '⛔️'
        })
        console.error(`Unexpected status code: ${res.status}`)
      }
    } catch (error) {
      toast.error('Error al añadir el libro', {
        position: 'top-right',
        icon: '⛔️'
      })
    }
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
