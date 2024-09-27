import { useContext } from "react";
import { Link } from "react-router-dom";
import DropdownCart from "./DropdownCart";
import '../Navbar.css'
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    // const token = false; // Estado de autenticación, ajústalo según tu aplicación
    const { token, logout } = useContext(UserContext);  // usar el UserContext
    const { cart, setCart, totalQuantity, totalPrice, toggleDropdown, isDropdownOpen } = useContext(CartContext);


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <Link to="/" className="navbar-brand p-1">🍕 Pizzeria DC</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-light">Home</Link>
                    </li>
                    {token ? (
                        <>
                        </>
                    ) : (
                        <>

                            <li className="nav-item">
                                <Link to="/login" className="nav-link">🔐 Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">🔐 Registrate</Link>
                            </li>
                        </>
                    )}
                </ul>


                {/* User Profile & Logout */}
                <div className="d-flex align-items-center ms-auto">
                    {token ? (
                        <>
                            {/* Perfil */}
                            < Link to="/profile" className="nav-link p-2 d-flex align-items-center">
                                <img
                                    src="https://th.bing.com/th/id/OIP.h4kSMQUys_XqXCI0RvSD_QHaHa?rs=1&pid=ImgDetMain"
                                    className="rounded-circle"
                                    height="28"
                                    alt="Profile"
                                    loading="lazy"
                                />
                            </Link>
                            <a className="nav-link text-light ms-2" onClick={logout} style={{ cursor: 'pointer' }}>🔒 Logout</a>
                        </>
                    ) : (
                        <>
                          
                        </>
                    )}
                    {/* Carrito de compras */}
                <div className="d-flex align-items-center position-relative text-dark">
                    <span className="navbar-text text-light p-2" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                        🛒 {totalQuantity} - $ {totalPrice.toLocaleString()}
                    </span>
                    {/* {isDropdownOpen && <DropdownCart cart={cart} setCart={setCart} totalQuantity={totalQuantity} totalPrice={totalPrice} />} */}
                    {isDropdownOpen &&
                        (
                            <div
                                className="dropdown-menu show p-2"
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    transform: 'translateY(10px)',
                                    zIndex: 1000,
                                    backgroundColor: 'white',
                                    border: '1px solid #fff'
                                }}
                            >
                                <DropdownCart />
                            </div>
                        )}
                </div>
                </div>
                
            </div>
        </nav >
    );
};

export default Navbar;
