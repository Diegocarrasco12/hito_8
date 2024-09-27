import React from 'react';

const Header = () => {
    return (
        <header>
            <div 
                className="p-5 text-center bg-image mb-4" 
                style={{
                    backgroundImage: 'url("https://sharpsburgpizza.com/wp-content/uploads/2021/03/pizzeria-template-menu-header-img-bg.jpg")', 
                    height: '400px',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    margin: '0'
                }}
            >
                <div 
                    className="mask" 
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
                >
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="text-white">
                            <h1 className="mb-3">Pizzería DC</h1>
                            <h4 className="mb-3">¡Tenemos las mejores pizzas de la ciudad!</h4>
                            
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;

