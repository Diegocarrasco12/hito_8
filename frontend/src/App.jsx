import React, { useContext } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Pizza from "./pages/Pizza";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import CartProvider, { CartContext } from "./context/CartContext";
import './App.css';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import UserProvider, {UserContext} from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {

  const location = useLocation()
  const {cart, setCart, addToCart, totalPrice, totalQuantity} = useContext(CartContext)
      

  const validRoutes = ['/', '/cardpizza', '/cart', '/register', '/home', '/login', '/pizza/p001', '/profile', '/pizza/p002', '/pizza/p003', '/pizza/p004', '/pizza/p005', '/pizza/p006']
  //condicional para mostrar el Navbar
  const shouldShowNavbar = validRoutes.includes(location.pathname)

  const PizzaPage = () => {
    // extre el id de la url usando params
    const { id } = useParams()
    return <Pizza pizzaId={id} />
  }

  return (
    
    <div className="app-container">

        {shouldShowNavbar && <Navbar cart={cart} setCart={setCart} totalQuantity={totalQuantity} totalPrice={totalPrice} />}

        <main className="main-content">
    
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/pizza/p001' element={<Pizza pizzaId="p001" />}></Route>
            <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
            <Route path="/pizza/:id" element={<PizzaPage />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
   

        </main>
            {shouldShowNavbar && <Footer />}     
    </div>
  )
}

export default App

// const Root = () => {
//   return (
//     <CartProvider>
//       < App />
//     </CartProvider>
//   )
// }

// export default Root;
