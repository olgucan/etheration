import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ProductsContext } from '../App';
import React, { useState, useEffect ,useContext  } from 'react';
import { Link } from "react-router-dom";

import "../App.css"
function CardItem(item) {
  const context = useContext(ProductsContext)
  return (
    <Card className='cartitem'  style={{height:"280px"}} >
       <Link to={`/singlepage/${item.id}`}>
       <Card.Img variant="top" src={item.image}  />
       </Link>
     
      <Card.Body>
        <Card.Title className='text-primary ' style={{fontSize:"14px",fontWeight:"bold"}}> {item.price}</Card.Title>
        <Card.Text style={{fontSize:"14px",fontWeight:"bold"}}>
          <span > {item.name} </span>
          <span>{item.model}</span>
        </Card.Text>
        <Button onClick={()=>context.addTocart(item)} variant="primary" style={{width:"100%",fontSize:"14px",alignSelf:"flex-end"}} 
        >
            Add to Card
            </Button>
            
      </Card.Body>
    </Card>
  );
}

export default CardItem;