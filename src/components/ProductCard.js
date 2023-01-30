import React from "react";
import { BiListPlus } from "react-icons/bi";
import { useProducts } from "../context/ProductContext";
import { actionTypes } from "../state/ProductState/actionTypes";

const ProductCard = ({ product }) => {
  const { disPatch } = useProducts();

  return (
    <div
      className='shadow-lg rounded-3xl border  p-3 flex flex-col text-sky-900'
    >
      <div className='h-52 w-52 mx-auto'>
        <img src={product.image} alt={product.model} />
      </div>
      <h1 className='font-bold text-center'>{product.model}</h1>
      <p className='text-center font-semibold mb-3'>Rating: {product.rating}</p>
      <div className=' flex-1'>
        <ul className='space-y-2'>
          {
            product?.keyFeature?.map((feature, i) => (
              <li key={i} className='text-sm'>{feature}</li>
            ))
          }
        </ul>
      </div>
      <div className='flex gap-2 mt-5'>
        <button className='bg-sky-500 rounded-full py-1 px-2 flex-1 text-white text-bold'
          onClick={() => disPatch({ type: actionTypes.ADD_TO_CART, payload: product })}
        >
          Add to cart
        </button>
        <button
          title='Add to wishlist'
          className='bg-sky-500  py-1 px-2 rounded-full'
          onClick={() => disPatch({ type: actionTypes.DELETE_TO_CART, payload: product._id })}
        >
          <BiListPlus className='text-white' />
        </button>
      </div>
    </div >
  );
};

export default ProductCard;
