import React, { useState, useEffect ,useContext  } from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavScrollExample from '../components/Nav';
import CardItem from '../components/CardBs';
import Pagination from 'react-bootstrap/Pagination';
import CheckExample from '../components/CheckboxBs';
import Basket from '../components/Basket';
import Form from 'react-bootstrap/Form';
import '../App.css'
import { ProductsContext } from '../App';
function Products() {

  const context = useContext(ProductsContext)
  

 // const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

//console.log(context.state)
  //basket start
 
 
  
  
//console.log(JSON.parse(localStorage.getItem('cart')))
  

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = context.state.products.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(context.state.products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <Pagination.Item key={number} id={number} onClick={handleClick}>
        {number}
        </Pagination.Item>
     
    );
  });

  
  return (
    <div>
        <NavScrollExample/>
        
      <Container style={{marginBlock:"6rem"}}>
      <Row>
      <Col lg={3}>
     <div style={{height:"200px"}} className='shadow p-3  bg-white rounded'>
     <div>
     <input type="radio" name='bir' onChange={()=>context.sortOldToNew()}/>
     <label htmlFor="" className='ms-2'>Old to new</label>
     </div>
     <div className='mt-2'>
     <input type="radio" name='bir' onChange={()=>context.sortNewToOld()}/>
      <label htmlFor="" className='ms-2'>New to old</label>
     </div>
    
     <div className='mt-2'>
     <input type="radio" name='bir' onChange={()=>context.sortpriceLowToHigh()} />
     <label htmlFor="" className='ms-2'>Price high to low</label>
     </div>
    <div className='mt-2'>
    <input type="radio" name='bir' onChange={()=>context.sortpriceHighToLow()}/>
     <label htmlFor="" className='ms-2'>Price low to hight</label>
    </div>
     </div>
     <div style={{height:"200px",overflowY:"scroll",position:'relative'}} className='shadow p-3 mt-4  bg-white rounded my-3'>
     <Form.Control type="text" onChange={(e)=>context.SearchBrands(e)} placeholder="Search" style={{border:"none",paddingLeft:'2rem'}} />
     <img className='searchicon' src={"./Search.svg"} />
     {context.filteredBrands.map((a,i)=>(
        
         <div className='mt-2'>
    <input type="checkbox" name='bir' value={a} onChange={(e)=>context.filterbyBrands(e)}/>
     <label htmlFor="" className='ms-2'>{a}</label>
    </div>
     ))}
    
     
     
     </div>
     <div style={{height:"200px",overflowY:"scroll",position:'relative'}} className='shadow p-3 mt-4  bg-white rounded'>

     <Form.Control onChange={(e)=>context.SearchModels(e)}  type="text" placeholder="Search" style={{border:"none",paddingLeft:'2rem'}} />
     <img className='searchicon' src={"./Search.svg"} />
     
     {context.filteredModels.map((a,i)=>(
         <div className='mt-2'>
         <input type="checkbox" onChange={(e)=>context.filterbyModels(e)} name='bir' value={a} />
          <label htmlFor="" className='ms-2'>{a}</label>
         </div>
     ))}
     </div>
      
      </Col>
      <Col lg={6} md={12} className='mt-4 mt-md-0'>
      <Row >
        {currentItems.map((item, index) => (
          
            <Col xs={12} md={6} lg={3} key={item.id} className='mb-5'>
            <CardItem key={index} {...item} ></CardItem>
            </Col>
         
        ))}
        </Row>
        </Col>
        <Col lg={3}>
         {
       JSON.parse(localStorage.getItem('cart')).length>0 && <Basket/>}  
       
        </Col>
       </Row>
        <Pagination id="page-numbers" style={{display:"flex",justifyContent:"center",marginBlock:"5rem"}}>
        {renderPageNumbers}
         </Pagination>
      </Container>
     
        <Container>
      <Row>
        
      </Row>
      </Container>

    </div>
  );
}

export default Products;