import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { register } = useContext(UserContext)
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden")
            return
        }

        try {
            await register(email, password)
            navigate('/profile')
        } catch (error) {
            setError("Error al registrar usuario")
        }
    }

    return (
        <>
            <div className='container-fluid m-4 '>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h1 className="text-center mb-4">Registro</h1>
                        <form className='formulario' onSubmit={handleRegister}>
                            
                            <div className='form-group'>
                                <label>Email</label>
                                <input type="email" id="email" className="form-control" value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label>Contraseña</label>
                                <input type="password" id="password" value={password} className='form-control'
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='form-group'>
                                <label>Confirmar contraseña</label>
                                <input type="password" id="confirmPassword" className='form-control' value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className='text-center'>
                                <button type='submit' className='btn btn-primary mt-2'>Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register