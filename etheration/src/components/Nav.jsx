import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css'
import React ,{ useContext  } from 'react'
import { ProductsContext } from '../App';
function NavScrollExample() {
  const context = useContext(ProductsContext)
  let cscart =JSON.parse(localStorage.getItem('cart'))
    const totalAmount = cscart.reduce((total,product)=>total+(product.count*product.price),0)
  return (
    <Navbar fixed="top" bg="primary" variant="dark" expand="lg">
      <Container  >
        <Navbar.Brand href="#">Eteration</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{marginLeft:"5rem"}}>
       
    
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
               <Form className="d-flex" style={{position:'relative'}}>
            <Form.Control style={{width:"25rem",paddingLeft:'2rem'}}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>context.filterbyNavInput(e)}
            />
            {/* <Button variant="outline-success">Search</Button> */}
            <img className='searchiconnav' src={"./Search.svg"} />
            </Form>
          </Nav>
            <div className='text-white me-5'> <img src={"./Portfeil.svg"} /> {totalAmount} TL</div>
            <div className='text-white ' > <img src={"./Profile.svg"} /> Kerem</div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;