import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Mongo Db
import api from '../../db/axiosConfig';

// Css
import './style.css';

// Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../db/firebaseConfig';


const CadastroUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [carregando, setCarregando] = useState();
  const [msgTipo, setMsgTipo] = useState("Aguarde");
  const [msg, setMsg] = useState('');
  const [skill, setSkill] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [ceo, setCeo] = useState("");
  const [passWord, setPassWord] = useState('');

  const handleCadastro = () => {
    if (!user || !ceo || !email || !passWord) {
      setMsgTipo("erro");
      setMsg('Verifique os campos em branco...');
      return;
    }
  
    const response = api.post("/cadastrouser", {
      user,
      company,
      phone,
      ceo,
      skill,
      email,
      passWord,
    })
    createUserWithEmailAndPassword(auth, email, passWord);
    toast("Cadastro efetuado com sucesso!" + email);
    setUser({ id: '1', usuarioEmail: email });
    setTimeout(() => {
      navigate('/Home', user);
  }, 3000);
  dispatch({ type: 'LOG_IN', usuarioEmail: email });
  }

  return (
    <>
      <div className='card-content box'>
        <ToastContainer
          position='top-center'
          className="toast-style"
          closeOnClick />
        <div className=" text-center text-light">
          <main className="form-signin form-cadastro  shadow px-5 pt-2 rounded bd-radius">
            <form>
              <h1 className="h3 mb-4 mt-2 fw-normal shadow-text">Cadastre-se</h1>
              <input
                type="text"
                className="form-control my-2 text-dark"
                // id="floatingInput"
                placeholder="Digite seu nome completo"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
              <input
                type="text"
                className="form-control my-2 text-dark"
                // id="floatingInput"
                placeholder="Empresa em que trabalha"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <input
                type="text"
                className="form-control my-2 text-dark"
                maxLength={16}
                placeholder="Telefone com DDD"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                className="form-control my-2 text-dark"
                // id="floatingInput"
                placeholder="Gestor responsável"
                value={ceo}
                onChange={(e) => setCeo(e.target.value)}
              />
              <input
                type="text"
                className="form-control my-2 text-dark"
                // id="floatingInput"
                placeholder="Função exercida"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
              <input
                type="email"
                className="form-control my-2 text-dark"
                placeholder="Digite seu email corporativo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control my-2"
                id="floatingPassword"
                placeholder="Password"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)}
              />
               {
                                carregando ? <div className="spinner-border text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span></div>
                                    :
                                    <button className="btn-block btn text-light btn-lg btn-secondary btn-login my-md-2" type="button"
                                        onClick={handleCadastro}
                                    >Cadastrar</button>
                            }
              <p className="text-muted" style={{ fontSize: 20, fontWeight: 'bold' }}><Link className='text-light' to="/">Voltar</Link></p>
              {/* <p className="text-muted" style={{ fontSize: 20, fontWeight: 'bold' }}><a className='text-light' href="/">Voltar</a></p> */}
              <p className="mt-3 mb-3 text-muted" style={{ fontSize: 20, fontWeight: 'bold' }}>&copy; 2022</p>

            </form>
          </main>
        </div>
      </div>
    </>
  )
}

export default CadastroUser