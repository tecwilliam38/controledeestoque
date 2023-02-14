import React, { useState } from 'react';
import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { auth } from "../../db/firebaseConfig"
import { signInWithEmailAndPassword } from 'firebase/auth';

// Import do Toastify (popup no centro)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.css';

import { useDispatch } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [msgTipo, setMsgTipo] = useState("");
  const [user, setUser] = useState('');
  const dispatch = useDispatch();

  const handleLogar = ({ user }) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(resultado => {
            setMsgTipo("sucesso");
            toast("Bem vindo!\n" + email);
            setUser({ id: '1', usuarioEmail: email })
            setTimeout(() => {
                navigate('/Home', user);
            }, 3000);
            dispatch({ type: 'LOG_IN', usuarioEmail: email });
        })
        .catch(erro => {
            setMsgTipo("erro");
        });
}
  
  return (
    <>
      <div className='card-content box'>
        <ToastContainer
                    className='toast-style'
                    closeOnClick
                    position="top-center" />
        <div className=" text-center text-light">
          <main className="form-signin form-cadastroUser shadow px-5 pt-2 rounded bd-radius">
            <form className="form-signin mx-auto text-light">
              <div className="text-center mb-4">
                <h1 className="h3 my-3 font-weight-bold">Login</h1>
              </div>
              <input
                type="email"
                id="inputEmail"
                className="form-control my-3"
                placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                id="inputPassword"
                className="form-control my-3"
                placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              />
              <div className="col d-flex justify-content-around">
              <button className="btn-block btn text-light btn-lg btn-secondary btn-login my-md-2 mr-2"
                type="button"
              onClick={handleLogar}
              >Log in</button>
              <button className="btn-block btn text-light btn-lg btn-secondary btn-sigin my-md-2"
                type="button"
              onClick={(e)=>navigate("Cadastro")}
              >Sign in</button>
              </div>
              <div className='text-center text-light h3'>
                {
                                    msgTipo === 'sucesso'
                                        ? <span className='h5 shadow-text text-light py-3 mb-1 mb-md-2'><strong>Aguarde você será direcionado...</strong></span>
                                        : <span className='h5 shadow-text text-light py-3 mb-1 mb-md-2'><strong>Ops!</strong> Verifique a senha.</span>
                                }
              </div>
              <div className="opcoes-login text-center">
                <Link to="/usuariorecuperarsenha" className="link-color mx-2">Recuperar Senha</Link>
                <span className="text-white">&#9733;</span>
                {/* <Link to='Cadastro' className="mx-2 my-3 link-color">Clique aqui para se cadastrar</Link> */}
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  )
}

export default Login