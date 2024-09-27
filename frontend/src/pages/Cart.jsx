import { pizzaCart } from '../pizzas'
import  '../Cart.css'
import { CartContext } from '../context/CartContext'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import Swal from 'sweetalert2';
import customImage from "../assets/pizza.gif"
import { useNavigate } from 'react-router-dom'


const Cart = () => {

    const {cart, increaseQuantity, decreaseQuantity, total, deletePizzaCart, setCart} = useContext(CartContext)
    const { token } = useContext(UserContext)
    const [successMessage, setSuccessMessage] = useState('')
    const navigate = useNavigate()

    const handleCheckout = async () => {

        if (!token) {
            Swal.fire({
                title: "Inicia sesión",
                text: "Debes iniciar sesión para procesar la compra.",
                icon: "warning",
                confirmButtonColor: "black"
            }).then(() => {
                navigate('/login') // Redirigir al login
            })
            return
        }

        try {
            await axios.post('http://localhost:5000/api/checkouts', { cart }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            // setSuccessMessage('Compra realizada con éxito!')
            Swal.fire({
                title: "Genial!",
                text: "Compra realizada con éxito!",
                imageUrl: customImage,
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
                confirmButtonColor: "black"
            })
            
            setCart([])  // Vaciar el carrito al finalizar la compra

        } catch (error) {
            console.error('Error al realizar la compra', error)
        }
    }


    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-4'>🛒 Tu Carrito</h2>
            {successMessage && <div className='alert alert-success'>{successMessage}</div>}
            {cart.length > 0 ? (
                <>
                    {cart.map(pizza => (
                        <div key={pizza.id} className='card mb-3 shadow-sm rounded'>
                            <div className='row g-0'>
                                <div className='col-md-4'>
                                    <img src={pizza.img} alt={pizza.name} className='img-fluid rounded-start' style={{ height: '100%', objectFit: 'cover' }}/>
                                </div>
                                <div className='col-md-8'>
                                    <div className='card-body d-flex flex-column justify-content-between'>
                                        <div>
                                            <h5 className='card-title fw-bold'>{pizza.name}</h5>
                                            <p className='card-text mb-2 text-muted'>Precio: {pizza.price.toLocaleString()}</p>
                                            <p className='card-text mb-4'>Cantidad: {pizza.quantity}</p>
                                            <p className='card-text text-muted'> {pizza.desc}</p> 
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <button className='btn btn-outline-primary btn-sm me-2 rounded-pill' onClick={() => increaseQuantity(pizza.id)}><i className="fas fa-plus"></i></button>
                                            <button className='btn btn-outline-danger btn-sm me-2 rounded-pill' onClick={() => decreaseQuantity(pizza.id)}><i className="fas fa-minus"></i></button>
                                            <button className='btn btn-danger btn-sm rounded-pill ms-auto' onClick={() => deletePizzaCart(pizza.id)}><i className="fas fa-trash"></i></button>
                                            
                                        </div>
                                           
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='text-center  mb-3'>
                        <h4>Total: ${total.toLocaleString()}</h4>
                        <button className='btn btn-dark btn-sm mt-2 w-25' onClick={handleCheckout}>Pagar</button>
                    </div>
                </>
            ) : (
                <h4 className='text-center'>El carrito está vacio</h4>
            )}
        </div>
    )

}

export default Cart

