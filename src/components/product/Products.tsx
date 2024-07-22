import { useEffect, useState } from 'react'
import * as productsService from '../../services/products';
import { IProduct } from '../../interfaces/IProduct';
import Modal from 'react-modal';
import ProductModal from './ProductModal';
import { CrudOptionEnum } from '../../helpers/Enums';
import { IMessage } from '../../interfaces/IMessage';
import { useNotification } from '../hooks/useNotifications';

function Products() {
    const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [modalViewIsOpen, setModalViewIsOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string>();
    const [products, setProducts] = useState<IProduct[]>([]);
    const { setNotificationMessage } = useNotification();
    
    const getProducts = async () => {
      try{ 
        const products = await productsService.getAll();
        if(products.length > 0) {
          setProducts(products);
        }
      } catch(err: unknown) {
        setNotificationMessage(err as IMessage);
      }
    };

    useEffect(() => {
        getProducts();
    }, [refresh]);

    const openCreateModal = () => {
      setModalCreateIsOpen(true);
    }

    const openViewModal = (id?: string) => {
      if(id) {
        setSelectedProductId(id);
      }
      setModalViewIsOpen(true);
    }
  
    const closeModal = (refresh: boolean= false) => {
      setModalCreateIsOpen(false);
      setModalViewIsOpen(false);
      if(refresh) {
        setRefresh(true);
      }
    }

    return (
      <div className="m-auto flex flex-col gap-7">
        <h1 className="bold text-3xl top-1.5 ">
          Products
        </h1>

        {products && products.length> 0 ? (
          <>
              <div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">  
                  <tr>
                    <th scope="col" className="px-6 py-3">NAME</th>
                    <th scope="col" className="px-6 py-3">PRICE</th>
                    <th scope="col" className="px-6 py-3">DESCRIPTION</th>
                    <th scope="col" className="px-6 py-3">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => {
                    return (
                      <tr key={item.id} className="bg-white border border-solid rounded">
                          <td className="px-6 py-4">{item.name}</td>
                          <td className="px-6 py-4">{item.price}</td>
                          <td className="px-6 py-4">{item.description}</td>
                          <td className="px-6 py-4">
                            <button onClick={() => openViewModal(item.id)}
                              className='focus:shadow-outline rounded bg-gray-600 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none'
                              >Detail</button>
                          </td>
                      </tr>
                    )
                  })}
                  </tbody>
              </table>
          </div>
          </>
        ) : (
          <div>
            <span className='text-lg font-bold text-red-500'>There is no products available.</span>
          </div>
        )}

      <button className='m-auto focus:shadow-outline w-48 rounded bg-blue-500 py-2 px-1 font-bold text-white hover:bg-blue-700 focus:outline-none' 
          onClick={openCreateModal}>Create a new product</button>
      <Modal
      
        isOpen={modalCreateIsOpen}
        contentLabel="Example Modal"
      >
        <ProductModal onCloseModal={closeModal} option={CrudOptionEnum.create} ></ProductModal>
      </Modal>

      <Modal
        isOpen={modalViewIsOpen}
        contentLabel="Example Modal"
      >
        <ProductModal onCloseModal={closeModal} option={CrudOptionEnum.view} selectedItem={selectedProductId}></ProductModal>
      </Modal>
    </div>
  )
}

export default Products
