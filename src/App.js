import React, { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// other files
import './App.css'
// import Header from './Components/Header'
import AddProduct from './Pages/AddProduct'
import Login from './Pages/Login'
import ProductList from './Pages/ProductList'
import Register from './Pages/Register'
import SearchProduct from './Pages/SearchProduct'
import UpdateProduct from './Pages/UpdateProduct'
import Protected from './Protected'

function App() {
  return (
    // <div className='App'>
    <BrowserRouter>
      <Fragment>
        {/* <Header /> */}
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* Private Routes */}
          {/* <Route path='/add' element={<AddProduct />} /> */}
          <Route path='/add' element={<Protected Cmp={AddProduct} />} />
          {/* <Route path='/update/:id' element={<UpdateProduct />} /> */}
          <Route
            path='/update/:id'
            element={<Protected Cmp={UpdateProduct} />}
          />
          {/* <Route path='/search' element={<SearchProduct />} /> */}
          <Route path='/search' element={<Protected Cmp={SearchProduct} />} />
          {/* <Route path='/product' element={<ProductList />} /> */}
          <Route path='/product' element={<Protected Cmp={ProductList} />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
    // </div>
  )
}

export default App
