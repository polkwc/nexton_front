import { FC, useEffect, useState } from 'react'
import { CrudOptionEnum } from '../../helpers/Enums';
import { useForm } from 'react-hook-form';
import * as productsService from '../../services/products';
import { IProduct } from '../../interfaces/IProduct';
import { useNotification } from '../hooks/useNotifications';
import { setSuccessMessage } from '../../helpers/Messages';
import { IMessage } from '../../interfaces/IMessage';

interface ChildProps {
    selectedItem?: string|null;
    option: CrudOptionEnum;
    onCloseModal: (value: boolean) => void;
}

const ProductModal: FC<ChildProps> = ({onCloseModal, option, selectedItem}) => {
    const { setNotificationMessage } = useNotification();
    const [product, setProduct] = useState<IProduct>();
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm();

    function closeModal(refreshParent:boolean = false) {
        onCloseModal(refreshParent);
    }

    const onSubmit = async (data: any) => {
        const {name, price, description} = data;
        const product: IProduct = {
            name,
            price,
            description,
        }
        try{ 
          const result = await productsService.create(product);
          setNotificationMessage(setSuccessMessage('Product has been saved'))
        } catch(err:unknown) {
          setNotificationMessage(err as IMessage);
        } finally {
          closeModal(true);
        }
      };
      
      const getProduct = async (id: string) => {
          try{ 
          const product = await productsService.getById(id);
          if(product) {
            setProduct(product);
          }
        } catch(err: unknown) {
          setNotificationMessage(err as IMessage);
        }
      };

      useEffect(() => { 
        if(option === CrudOptionEnum.view && selectedItem != undefined) {
          getProduct(selectedItem);
        }
      }, []);

  return (
      <div className='m-auto flex w-1/2 flex-col gap-4'>
        {option === CrudOptionEnum.create && (
          <>
            <h1 className="bold text-3xl">
              Product creation
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <div className='input-wrapper flex flex-row gap-2'>
                    <label htmlFor='name'>
                        Name
                    </label>
                    <input
                        id='name'
                        className='border-solid border rounded border-black '
                        {...register('name', { required: true, maxLength: 40 })}
                        placeholder='Name'
                    />
                    <small className='text-xs font-bold text-red-500'>
                        {errors.name?.type === 'required' && 'The name is required'}
                    </small>
                </div>
                <div className='input-wrapper flex flex-row gap-2'>
                    <label htmlFor='price'>
                        Price
                    </label>
                    <input
                        id='price'
                        className='border-solid border rounded border-black '
                        {...register('price', { required: true, maxLength: 40 })}
                        placeholder='Price'
                    />
                    <small className='text-xs font-bold text-red-500'>
                        {errors.price?.type === 'required' && 'The price is required'}
                    </small>
                </div>
                <div className='input-wrapper flex flex-row gap-2'>
                    <label htmlFor='description'>
                        Description
                    </label>
                    
                    <input
                        id='description'
                        className='border-solid border rounded border-black '
                        {...register('description', { required: true, maxLength: 40 })}
                        placeholder='Description'
                        // maxLength='80'
                    />
                    <small className='text-xs font-bold text-red-500'>
                        {errors.description?.type === 'required' && 'The description is required'}
                    </small>
                </div>
                <div className=' space-x-3  '>
                   <input type='submit' className='focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none' value='Save' />
                   <button onClick={() => closeModal(false)} className='focus:shadow-outline rounded bg-gray-600 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none' >Close</button>
                </div>
            </form>
          </>
        )}

        {option === CrudOptionEnum.view && (
          <>
            <h1 className="bold text-3xl">
              Product detail
            </h1>
            {product ? (
              <div className="flex flex-col gap-2">
                <div className='space-x-2'>
                  <span className='font-semibold text-2xl'>
                     Name:
                  </span>
                  <span className='font-normal text-2xl'>
                     {product.name}
                  </span>
                </div>
                <div className='space-x-2'>
                  <span className='font-semibold text-2xl'>
                    Price:
                  </span>
                  <span className='font-normal text-2xl'>
                    {product.price}
                  </span>
                </div>
                <div className='space-x-2'>
                  <span className='font-semibold text-2xl'>
                    Description
                  </span>
                  <span className='font-normal text-2xl'>
                    {product.description}
                  </span>
                </div>
                <div className='input-wrapper space-y-11'>
                  <button onClick={() => closeModal(false)} className='focus:shadow-outline rounded bg-gray-600 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none' >Close</button>
                </div>
              </div>
            ) : (
              <div className='input-wrapper space-y-11'>
                <span>Something wrong when tried to get the product.</span>
                <button onClick={() => closeModal(false)} className='focus:shadow-outline rounded bg-gray-600 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none' >Close</button>
              </div>
            )}
          </>
        )}
      </div>
  )
}

export default ProductModal