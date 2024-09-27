import { useState, useEffect, useContext } from "react"
import { CartContext } from "../context/CartContext"
import '../pizza.css'
import { Link } from "react-router-dom";
import PizzaSlider from "../components/PizzaSlider";
import '../App.css'
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';


const Pizza = ({ pizzaId }) => {
    
    const { addToCart, data } = useContext(CartContext)
    const [pizza, setPizza] = useState(null)

    const url = `http://localhost:5000/api/pizzas/${pizzaId}`

    const getPizzaData = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            const data = await response.json();
            setPizza(data);
        } catch (error) {
            console.error('Error al obtener los datos de la pizza:', error);
        }
    }



    useEffect(() => {
        getPizzaData()
    }, [pizzaId])

    if (!pizza) {
        return <p>Cargando ....</p>  // muestra un mensaje de carga mientras obtiene los datos
    }

    // Excluir la pizza actual del slider
    const otherPizzas = data.filter(p => p.id !== pizzaId)

    return (
        <div className="container py-4">
            {/* Main Pizza Card */}
            <div className="card shadow-lg mb-4">
                <div className="row g-0">
                    <div className="col md-4">
                        <img src={pizza.img} alt={pizza.name} className="card-img rounded-start w-100 h-100 object-fit-cover" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body px-4">
                            <h2 className="card-title mt-2">🍕  {pizza.name}</h2>
                            <p className="card-text text-start">{pizza.desc} </p>
                            <p className="card-text mt-3"><strong>Ingredientes: </strong></p>
                            <ul className="card-text list-inline text-center">
                                {pizza.ingredients.map((ingredient, index) => (
                                    <li key={index} className="list-inline-item">🍕  {ingredient}</li>
                                ))}
                            </ul>

                            <div className="d-flex justify-content-between align-items-center mt-4">
                                {/* <button className="btn btn-warning">Ver más</button> */}
                                <h4 className="mb-0"><strong>Precio: </strong>${pizza.price.toLocaleString()}</h4>
                                <button className="btn text-white bg-dark btn-sm" onClick={() => addToCart(pizza)}><strong>Añadir</strong> 🛒</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thumbnails of Other Pizzas */}
            <div className="my-4">
                <PizzaSlider pizzas={otherPizzas} />
            </div>

        </div>

    )
}

export default Pizza