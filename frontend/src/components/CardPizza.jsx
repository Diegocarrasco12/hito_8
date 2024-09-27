import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const CardPizza = ({ pizza}) => {
    const { cart, setCart, addToCart} = useContext(CartContext)

    const handleAddToCart = () => {
        addToCart(pizza);
    };


    return (
        <div className="card h-100">
            <img src={pizza.img} alt={pizza.name} className="card-img-top rounded mx-auto d-block" />
            <div className="card-body">
                <h2 className="card-title">🍕  {pizza.name}</h2>
                <p className="card-text"><strong>🍕  Ingredientes: </strong></p>                                       
                <ul className="card-text list-inline">
                    {pizza.ingredients.map((ingredient, index) => (
                        <li key={index} className="list-inline-item">{ingredient}</li>
                    ))}
                </ul>
                <h4 className="card-text text-center p-1"><strong>Precio: </strong>${pizza.price.toLocaleString()}</h4> 
                <div className="d-flex justify-content-evenly">
                    <Link to={`/pizza/${pizza.id}`} className="btn btn-card text-white bg-dark">
                        <button className="btn btn-card text-white bg-dark"><strong>Ver más</strong></button>
                    </Link>
                    <button 
                        className="btn btn-card text-white bg-dark" 
                        onClick={handleAddToCart}
                        // onClick={() => addToCart(pizza)}
                    >
                        <strong>Añadir</strong> 🛒
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardPizza;


        