import React from 'react';
import '../Dropdown.css';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';


const DropdownCart = () => {

    const { cart, increaseQuantity, decreaseQuantity, emptyCart, totalPrice, deletePizzaCart } = useContext(CartContext)

    return (
        <div className="dropdown-menu-content dropdown-menu-end p-3 shadow-lg" style={{ minWidth: '350px', right: '0', left: 'auto' }} tabIndex="-1">
            <h3 className="dropdown-header">Carrito</h3>
            <div className="dropdown-item p-1">
                {cart.length === 0 ? (
                    <p>No hay productos en el carrito.</p>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="d-flex align-items-center mb-3">
                            <img src={item.img} alt={item.name} className="rounded me-2" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                            <div className='flex-grow-1'>
                                <p>{item.name} - {item.quantity} x ${item.price.toLocaleString(0)}</p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='d-flex'>
                                        <button className="btn btn-outline-primary btn-sm me-2"
                                            onClick={() => increaseQuantity(item.id)}                                                                                      
                                        >
                                            <i className="fas fa-plus"></i>
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-sm me-2"
                                            onClick={() => decreaseQuantity(item.id)}
                                        >
                                            <i className="fas fa-minus"></i>
                                        </button>
                                    </div>
                                    <button className='btn btn-danger btn-sm' onClick={() => deletePizzaCart(item.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="dropdown-footer text-dark mt-2">
                <p className="mb-1">Total: ${totalPrice.toLocaleString()}</p>
                <button className="btn btn-danger w-100 mt-2" onClick={emptyCart}>
                    Vaciar Carrito
                </button>
                <Link to="/cart" className="btn btn-dark mt-2 w-100">Ir al carrito</Link>
            </div>
        </div>
    );
};

export default DropdownCart;


