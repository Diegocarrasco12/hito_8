import '../../src/404.css'
import { Link } from "react-router-dom";

const NotFound = () => {
  return (

  <>
    <body className="bg-purple h-100">
        
        <div className="stars">
            <div className="custom-navbar">
                <div className="brand-logo">
                    <img src="" width="80px"/>
                </div>
                <div className="navbar-links">
                    <ul>
                      <li><Link to="/" className="text-white ms-3 text-decoration-none">HOME</Link></li>
                      <li><Link to="/register" className="text-white ms-3 text-decoration-none"> Registro </Link> </li>
                      <li><Link to="/login" className="text-white ms-3 text-decoration-none ms-auto">Login</Link> </li>                     
                    </ul>
                </div>
            </div>
            <div className="central-body">
                <img className="image-404" src="https://img.freepik.com/vector-gratis/pagina-error-404-distorsion_23-2148105404.jpg" width="300px"/>
                <Link to="/" className="btn-go-home">Volver a HOME</Link>
            </div>

        </div>

    </body>
    </> 
  );
};
export default NotFound;
