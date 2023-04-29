import React, {createContext ,useState, useEffect} from 'react';
import { Route, Routes } from "react-router-dom";
import Products from './pages/products';
import Singlepage from './pages/singlepage';


export const ProductsContext = createContext()
function App() {
  

  const [models,setModels]=useState([])
  const [brands,setBrands]=useState([])
  const [filteredModels,setFilteredModels]=useState([])
  const [filteredBrands,setFilteredBrands]=useState([])
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await fetch('https://5fc9346b2af77700165ae514.mockapi.io/products');
      const data = await response.json();
      setData(data);
      setState({...state,products:data,cart:[]})
    } catch (error) {
      console.error(error);
    }
  }
//  useEffect(()=> {
//     setState({...state,products:data})
//  },data)
  const [state, setState] = useState({
    products:data,
    cart:[],
    selectedbrand:[],
    selectedmodel:[]
  })

  // useEffect(()=>{
  //   localStorage.setItem('cart',JSON.stringify([]))
  // })
  // useEffect(()=> {
  //   let cs = localStorage.getItem('cart')
  //   localStorage.setItem('cart',JSON.stringify([...JSON.parse(cs),...state.cart]))
   
  // },[state.cart])
  const addTocart = product => {
   
   const cart = state.cart.find(cartitem=>cartitem.id==product.id) ? 
   state.cart.map(cartitem => cartitem.id==product.id ? 
    {...cartitem,count:cartitem.count+1} : cartitem ) : [...state.cart, {...product,count:1}]

    setState({...state,cart })

    localStorage.setItem('cart',JSON.stringify(cart))
    // let cs=localStorage.getItem('cart')
   
    //   localStorage.setItem('cart',JSON.stringify(...state.cart))
   
    // console.log(state)
  }
  const increase = id => {
    // setState({
    //   ...state,cart:state.cart.map(item=>item.id==id ? {...item,count:item.count+1} : item)
    // })
    let oldcard = JSON.parse(localStorage.getItem('cart'))
    const cart2 = oldcard.map(item=>item.id==id ? {...item,count:item.count+1} : item)
    setState({
      ...state,cart2
    })
    localStorage.setItem('cart',JSON.stringify(cart2))
    // let cs=localStorage.getItem('cart')
    // localStorage.setItem('cart',JSON.stringify(...state.cart))
  }
  const decrease = id => {
    let oldcard = JSON.parse(localStorage.getItem('cart'))
    const cart3 = oldcard.map(item=>item.id==id ? {...item,count: item.count>1 ? item.count-1 : 1} : item)
    setState({
      ...state,cart3
    })
    localStorage.setItem('cart',JSON.stringify(cart3))
    // let cs=localStorage.getItem('cart')
    // localStorage.setItem('cart',JSON.stringify(...state.cart))
  }
  const sortOldToNew = () => {
    setState({...state,products:data.sort(function(a,b){
     
      return new Date(b.createdAt) - new Date(a.createdAt);
    })})
   
  }
  const sortNewToOld = () => {
    setState({...state,products:data.sort(function(a,b){
     
      return new Date(a.createdAt) - new Date(b.createdAt);
    })})
   
  }
  const sortpriceHighToLow = () => {
    setState({...state,products:data.sort(function(a,b){
     
      return a.price - b.price;
    })})
   
  }
  const sortpriceLowToHigh = () => {
    setState({...state,products:data.sort(function(a,b){
     
      return b.price - a.price;
    })})
   
  }
  const filterbyNavInput = (e) => {
    setState({...state,products:data.filter(function(a,b){
     
      return a.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 
      || a.brand.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      || a.model.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
    })})
   
  }
  const filterbyModels = (e) => {
    const selectedmodel = state.selectedmodel.includes(e.target.value)? 
    state.selectedmodel.filter(a=>a!=e.target.value) 
    : [...state.selectedmodel,e.target.value] 
 
    setState({...state,
      selectedmodel,
      products:data.filter(function(a,b){
      
      return selectedmodel.length==0 ? true :  selectedmodel.includes(a.model) 
    
    })}) 
    //  setState({...state,products:data.filter(function(a,b){
     
  //     return a.model.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 
    
  //   })}) 
   
  }
  //console.log(state)
  const filterbyBrands = (e) => {
    const selectedbrand=state.selectedbrand.includes(e.target.value)? state.selectedbrand.filter(a=>a!=e.target.value) : [...state.selectedbrand,e.target.value] 
   // console.log(selectedbrand)
    setState({...state, 
      selectedbrand,
      products:data.filter(function(a,b){
      
      return selectedbrand.length==0 ? true :  selectedbrand.includes(a.brand)  
    
    })}) 
   
  }

  const AllModels = () => {
    let b = []
    data.forEach(a=> {
      if (b.includes(a.model)){
        return
      }
      b.push(a.model)
    })
    setModels(()=>b)
    setFilteredModels(()=>models)
  }
  const SearchModels= (e) => {
  //   let t = models
  //  let k= t.filter(function(a,b){
     
  //     return a.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 
     
  //   })
  //   setModels(k)

    setFilteredModels(()=>models.filter(a=> e.target.value.length==0 ? true : a.toLowerCase().includes(e.target.value.toLowerCase())))
    
  }
  const AllBrands = () => {
    let b = []
    data.forEach(a=> {
      if (b.includes(a.brand)){
        return
      }
      b.push(a.brand)
    })
   setBrands(()=>b)
   setFilteredBrands(()=>brands)
  }
  const SearchBrands= (e) => {
    //   let t = models
    //  let k= t.filter(function(a,b){
       
    //     return a.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 
       
    //   })
    //   setModels(k)
  
      setFilteredBrands(()=>brands.filter(a=> e.target.value.length==0 ? true : a.toLowerCase().includes(e.target.value.toLowerCase())))
      
    }
  useEffect(()=> {
    AllBrands()
    AllModels()
  },[data])
  
  return (
  <ProductsContext.Provider value={{state:state,addTocart,increase,decrease,sortOldToNew
  ,sortNewToOld,sortpriceHighToLow,sortpriceLowToHigh,filterbyNavInput,
  AllBrands,AllModels,filterbyBrands,filterbyModels,SearchBrands,filteredModels,SearchModels,filteredBrands}}>
        <Routes>
  <Route  path="/" element={<Products/>} />
  <Route path="/singlepage/:id" element={<Singlepage/>} />
  
</Routes>
</ProductsContext.Provider>
  );
}

export default App;