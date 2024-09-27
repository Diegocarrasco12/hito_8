import "../profile.css"
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Profile = () => {
    const { email, logout } = useContext(UserContext);

    console.log('Email en Profile:', email); 
    return (
        
            <div className=" container py-5 h-100" >
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <div className="card mb-3 shadow-lg border-0 rounded-lg">
                            <div className="row g-0">
                                <div className="col-md-4 gradient-custom text-center text-white rounded-start">
                                    <img src="https://static.vecteezy.com/system/resources/previews/002/165/527/non_2x/line-icon-for-pizza-vector.jpg" alt="Avatar" className="img-fluid my-5 rounded-circle" style={{ width: '150px', objectFit: 'cover' }} />
                                    <h5 className="mt-3 font-weight-bold">Usuario ejemplo</h5>
                                    <p className="img-fluid my-5 rounded-circle">Usuario</p>
                                    <i className="far fa-edit mb-5 fa-lg"></i>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body p-4">
                                        <h6 className="font-weight-bold">Information</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Email</h6>
                                                <p className="text-muted">{email}</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Phone</h6>
                                                <p className="text-muted">123 456 789</p>
                                            </div>
                                        </div>
                                        <h6 className="font-weight-bold">Projects</h6>
                                        <hr className="mt-0 mb-4" />
                                        <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                                <h6>Recent</h6>
                                                <p className="text-muted">Lorem ipsum</p>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <h6>Most Viewed</h6>
                                                <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start">
                                            <a href="#!" className="me-3 text-dark"><i className="fab fa-facebook-f fa-lg"></i></a>
                                            <a href="#!" className="me-3 text-dark"><i className="fab fa-twitter fa-lg"></i></a>
                                            <a href="#!" className="text-dark"><i className="fab fa-instagram fa-lg"></i></a>                                            
                                        </div>
                                        <button className="btn text-white btn-dark mt-4" onClick={logout}>Cerrar Sesión</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
    )
}

export default Profile