import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import CartProvider, { CartContext } from '../context/CartContext'
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../Slider.css'


const PizzaSlider = ({ pizzas }) => {

    const { addToCart, data } = useContext(CartContext)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <FaChevronRight className="slick-arrow slick-next" />,
        prevArrow: <FaChevronLeft className="slick-arrow slick-prev" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };




    return (
        
            <Slider {...settings}>
                {pizzas.map(pizza => (
                        <div key={pizza.id} className="card shadow-sm rounded">
                            <img src={pizza.img} alt={pizza.name} className="card-img-top rounded" style={{ height: '150px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }} />
                            <div className="card-body p-3 text-center">
                                <h5 className="card-title font-weight-bold" style={{ fontSize: '1rem' }}>{pizza.name}</h5>
                                <p className="card-text text-muted" style={{ fontSize: '0.9rem' }}>${pizza.price.toLocaleString()}</p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/pizza/${pizza.id}`} className="btn btn-sm" style={{ backgroundColor: '#343a40', color: '#fff' }}>
                                        Ver más
                                    </Link>
                                    <button className="btn btn-sm" style={{ backgroundColor: '#343a40', color: '#fff' }} onClick={() => addToCart(pizza)}>
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </Slider>
        
    );
};

export default PizzaSlider;