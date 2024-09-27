import { createContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import customImage from "../assets/pizza.gif"
import { useLocation } from 'react-router-dom';

export const CartContext = createContext()

const url = "http://localhost:5000/api/pizzas"


const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {

        const savedCart = JSON.parse(localStorage.getItem('cart')) || []
        console.log('Carrito recuperado del localStorage:', savedCart)
        setCart(savedCart)
       
    }, [])


    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('cart', JSON.stringify(cart));
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [cart]);


    // Obtener las pizzas del API
    const getData = async () => {
        try {
            const response = await fetch(url); // Ajusta la URL si es necesario
            const pizzas = await response.json();
            setData(pizzas);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const increaseQuantity = (id) => {
        setCart(cart.map((pizza) =>
            pizza.id === id ? { ...pizza, quantity: pizza.quantity + 1 } : pizza
        ))
    }

    const decreaseQuantity = (id) => {
        setCart(cart.map((pizza) =>
            pizza.id === id && pizza.quantity > 0
                ? { ...pizza, quantity: pizza.quantity - 1 }
                : pizza
        ).filter(pizza => pizza.quantity > 0)
        )
    }

    const deletePizzaCart = (id) => {
        setCart(cart.map((pizza) =>
            pizza.id === id && pizza.quantity > 0
                ? { ...pizza, quantity: pizza.quantity = 0 }
                : pizza
        ).filter(pizza => pizza.quantity > 0)
        )
    }

    const total = cart.reduce((acc, pizza) => acc + pizza.price * pizza.quantity, 0)


    // Función para agregar una pizza al carrito
    const addToCart = (pizzaToAdd) => {
        // console.log('Pizza to Add:', pizzaToAdd);
        setCart(prevCart => {

            
            // Verificar si la pizza ya está en el carrito
            const existingPizzaIndex = prevCart.findIndex(pizza =>  pizza.id === pizzaToAdd.id )
                

            if (existingPizzaIndex > -1) {
                // Si la pizza ya existe en el carrito, actualizar la cantidad
                const updatedCart = [...prevCart];
                updatedCart[existingPizzaIndex].quantity += 1;
                // console.log('Updated Cart:', updatedCart);
                return updatedCart;
            } else {
                // Si la pizza no existe, agregarla al carrito con cantidad 1
                // console.log('Adding New Pizza:', { ...pizzaToAdd, quantity: 1 });
                return [...prevCart, { ...pizzaToAdd, quantity: 1 }];
            }
        });

        Swal.fire({
            title: "Genial!",
            text: "Tu pizza ha sido agregada.",
            imageUrl: customImage,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Custom image",
            confirmButtonColor: "black"
        });
    };


    const location = useLocation();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        // console.log("esta funcionando")
    };

    useEffect(() => {
        setIsDropdownOpen(false)
    }, [location])




    const emptyCart = () => {
        // console.log("Vaciar carrito"); // Verifica si el evento se captura
        setCart([]);
    };


    // Funcion para calcular la cantidad total de productos 
    const totalQuantity = cart.reduce((acc, pizza) => acc + pizza.quantity, 0)

    // Funcion para calcular el total del carrito 
    const totalPrice = cart.reduce((acc, pizza) => acc + pizza.price * pizza.quantity, 0)


    return (
        <CartContext.Provider value={{ cart, setCart, increaseQuantity, decreaseQuantity, addToCart, total, emptyCart, totalPrice, totalQuantity, data, setData, getData, deletePizzaCart, toggleDropdown, isDropdownOpen }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider