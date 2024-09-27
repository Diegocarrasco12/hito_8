import React, { useContext } from "react";
import Header from "../components/Header";
import CardPizza from '../components/CardPizza';
import Pizza from "./Pizza";
import { useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";




const Home = () => {
    const {cart, setCart, addToCart, data, setData, getData} = useContext(CartContext)

    
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container-fluid p-0">
            <Header />
            <div className="row row-cols-1 row-cols-md-3 g-4 p-4">
                {data.map((pizza) => (
                    <div key={pizza.id} className="col">
                        <CardPizza pizza={pizza} addToCart={addToCart}/>                            
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;