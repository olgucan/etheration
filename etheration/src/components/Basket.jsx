import React ,{ useContext, useEffect  } from 'react'
import { ProductsContext } from '../App';

const Basket = () => {
    // useEffect(()=> {
    //     let cscart =JSON.parse(localStorage.getItem('cart'))
        
    // })
    let cscart =JSON.parse(localStorage.getItem('cart'))
     const context = useContext(ProductsContext)
    const totalAmount = cscart.reduce((total,product)=>total+(product.count*product.price),0)
    //let cs = JSON.parse(localStorage.getItem('cart'))
  return (
    <>
    <div style={{minHeight:"200px"}} className='shadow p-3  bg-white rounded '>
        {cscart.map(item => (
            <div className='d-flex justify-content-between align-items-center' key={item.id}>
                <div>
                    <p className='' style={{margin:0}}>{item.brand}</p> <small className='text-primary'>{item.price} TL</small>
                </div>
                <div className='d-flex'>
                    <button onClick={()=>context.decrease(item.id)} className=' d-flex align-items-center justify-content-center' 
                    style={{width:"40px",height:"40px",fontSize:"30px",border:"none"}}>-</button ><div className='bg-primary text-white d-flex align-items-center justify-content-center ' style={{width:"40px",height:"40px",fontSize:"20px"}}>{item.count}</div> <button 
                    onClick={()=>context.increase(item.id)} className='  d-flex align-items-center justify-content-center' 
                    style={{width:"40px",height:"40px",fontSize:"30px",border:"none"}}>+</button>
                </div>
            </div>
        ))}
    </div>
    <div className='shadow bg-white p-3 mt-4'>
          <h5>Total Price <b className='text-primary'>{totalAmount} TL</b></h5>
          <button className='btn w-100 btn-primary mt-2'>Checkout</button>
    </div>
    </>
  )
}

export default Basket
