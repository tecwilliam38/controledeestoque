import React, { useState, useEffect } from "react";
import './style.css'

import api from '../../db/axiosConfig';
import { useNavigate } from 'react-router';

import { useSelector } from 'react-redux';

import Menu from '../Navbar'

const Home = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState('');
    const [skill, setSkill] = useState("");
    const [email, setEmail] = useState();
    const [user, setUser] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [ceo, setCeo] = useState("");
    const [passWord, setPassWord] = useState('');
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    return (
        <>
            <div className='bg-login'>
            <Menu />
                <section className='container mt-3'>
                    <div className="jumbotron bg-table-home">
                        <h1 className="display-4">Bem vindo(a): <div className='h3'>{usuarioEmail}.</div></h1>
                        <p className="lead">Este sistema está  em fase de desnvolvimento e testes.</p>
                        <hr className="my-4" />
                        <p>Algumas funcionalidades podem ainda não estar acessíveis. </p>
                        <footer className='mt-3'>
                            <a target='_blank' rel='noreferrer' href="https://github.com/tecwilliam38?tab=repositories" className="text-white shadow-text text-center">Feito por<strong> William Ferreira da Silva </strong></a>
                        </footer>
                        {/* <button onClick={handleCadastroUser} className='btn-block btn btn-primary mt-5 btn-lg ml-1'>Marcely</button>
                        <button onClick={handleCadastro} className='btn-block btn btn-primary mt-5 btn-lg ml-1'>Enviar</button> */}

                    </div>
                </section>
            </div>
        </>
    )
}

export default Home;
