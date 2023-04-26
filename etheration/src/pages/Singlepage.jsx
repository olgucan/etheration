import React,{useContext} from 'react'
import { Routes, Route, useParams } from 'react-router-dom';
import { ProductsContext } from '../App';
import NavScrollExample from '../components/Nav';
import Basket from '../components/Basket';
const Singlepage = () => {
  let {id} = useParams();
  console.log(id)
  const context = useContext(ProductsContext)
  let singlecart = context.state.products.find(a=>a.id==id)
  console.log(singlecart)
  return (
    <>
    <NavScrollExample/>
    <div className='container ' style={{marginTop:"10rem"}}>
      <div className="row">
        <div className="col-md-9 shadow p-3">
        <div className="row">
        <div className="col-md-6">
           <img className='img-fluid h-100' src={singlecart.image} alt="" />
        </div>
        <div className="col-md-6">
            <div className="header">
             <div className='mb-5'>
             <h2 className=''>{singlecart.brand} {singlecart.name}</h2>
              <strong className='text-primary'>{singlecart.price}</strong>
             </div>
              <button onClick={()=>context.addTocart(singlecart)} className='btn btn-primary w-100 mb-2'>Add to Cart</button>
              <p>{singlecart.description}</p>
            </div>
        </div>
      </div>
        </div>
        <div className="col-md-3">
        {context.state.cart.length>0 && <Basket/>}
        </div>
      </div>
     
    </div> 
    </>
  )
}

export default Singlepage
