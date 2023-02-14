import React, { useState, useEffect } from 'react'
import './style.css'

import api from "../../db/axiosConfig";

import { useNavigate, Link, useParams, useRoute } from 'react-router-dom';
import Menu from '../Navbar/index';

// Icons
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';

// Import do Toastify (popup no centro)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FindPc = (asset) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    // const [asset, setAsset] = useState("");
    const [serviceTag, setServiceTag] = useState("");
    const [disp, setDisp] = useState("");
    const [user, setUser] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const [data, setData] = useState([]);
    //  const [asset, setAsset] = useParams();

    // useEffect(()=>{
    //     console.log(data.asset)
    //     const getPc = async () => {
    //         try {
    //             const response = await api.get(`/cadastroPc/${asset}`) 
    //             setData(response.data);
    //             console.log(data);
    //         } catch(err){console.log("Ocorreu um erro:"+err)};
    //  }
    //  getPc();
    // },[])

    useEffect(()=>{
        async function getSearchMovie(){
            const response = await api.get(`/consultaPc/${asset}`)
                setMovie(response);
                console.log(response);
        }
            getSearchMovie();
            return;
    },[])

    // useEffect(() => {
    //     async function getAllPcs() {
    //         const response = await api.get(`/cadastroPc/${asset}`)
    //         setData(response.data)
            // setAsset(response.data.asset);
            // setMsg(response.data.msg)
            // setUser(response.data.user)
            // setServiceTag(response.data.serviceTag)
            // setDisp(response.data.disp)
            // setStatus(response.data.status)
            // console.log(response.data);
    //     }
    //     getAllPcs();
    // }, [])


    const handleDelete = async (id) => {

        const deletedPc = await api.delete(`/cadastroPc/${id}`);

        if (deletedPc) {
            setData(data.filter(pc => pc.id !== id));
        }
        toast("registro excluído com sucesso!");
        setTimeout(() => {
            navigate('/home', user);
        }, 3000);
    }
    const updatePcSelected = (item) => {
        const { asset, disp, msg, serviceTag, user, status } = data;
        localStorage.setItem(data.id);
        localStorage.setItem(asset);
        localStorage.setItem(serviceTag)
        localStorage.setItem(user)
        localStorage.setItem(status)
        localStorage.setItem(msg)
        localStorage.setItem(disp);
        console.log(item);
    };

    return (
        <>
          <div className='bg-login'>
        <ToastContainer
          className="toast-style"
          closeOnClick
          position="top-center" />
        <Menu />
        <div className='py-2 mt-2 rounded-top bg-table-cadastro container'>
          <div className="row px-3">
            <div className="col pb-3">
              <label for="inputEmail4" className='text-light px-1 py-2'>Asset</label>
              <input type="text" className="form-control" placeholder="Asset"
                maxLength={13}
                // value={asset} onChange={(e) => setAsset(e.target.value)} 
                />
                {/* value={asset} onChange={(e) => setAsset(e.target.value)} /> */}
            </div>
            <div className="col pb-3">
              <label for="inputEmail4" className='text-light px-1 py-2'>Service tag</label>
              <input type="text" className="form-control"
                placeholder="Service tag" maxLength={15}
                value={serviceTag} onChange={(e) => setServiceTag(e.target.value)} />
            </div>
            <div className="col pb-3">
                            <label for="inputEmail4" className='text-light px-1 py-2'>Disponibilidade</label>
                            <select className="form-control" id="exampleFormControlSelect1" value={disp} onChange={(e) => setDisp(e.target.value)}>
                                <option value={"selected"}>Selecionar</option>
                                <option>Disponível</option>
                                <option>Indisponível</option>
                            </select>
                        </div>
                    </div>
                    <div className="row pb-3 px-3">
                        <div className="col pb-3">
                            <label for="inputEmail4" className='text-light px-1 py-2'>Usuário</label>
                            <input type="text" className="form-control" placeholder="Usuário"
                                value={user} onChange={(e) => setUser(e.target.value)} />
                        </div>
                        <div className="col pb-3">
                            <label for="inputEmail4" className='text-light px-1 py-2'>Estado</label>
                            <select className="form-control" id="exampleFormControlSelect1"
                                value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option selected>Selecionar</option>
                                <option>Pronto para retirar</option>
                                <option>Em estoque</option>
                                <option>Com o field</option>
                                <option>Falta csv</option>
                                <option>Atualizar drivers</option>
                                <option>Instalar office</option>
                                <option>Nenhum...</option>
                            </select>
                        </div>
                        <div className="col pb-3">
                            <label for="inputEmail4" className='text-light px-1 py-2'>Observação</label>
                            {/* <input type="text" className="form-control" placeholder="Asset"
                                value={msg} onChange={(e) => setMsg(e.target.value)} /> */}
                            <textarea type='text'
                                rows={1} className='form-control' placeholder='Observação'
                                value={msg} onChange={(e) => setMsg(e.target.value)}
                                maxLength={500}
                            />
                        </div>
                        <div className="col d-flex justify-content-around">
                                                    <button type='submit'
                                                        className='btn btn-block btn-danger mt-5 btn-lg ml-1'
                                                        // onClick={() => handleDelete(item._id)}
                                                    >Excluir
                                                        <AiTwotoneDelete className='h4 ml-2' />
                                                    </button>
                                                    <Link 
                                                    // to={{ pathname: `/UpdatePc/${item._id}` }}
                                                    to='home'
                                                    >
                                                        <button type='submit'
                                                            className='btn btn-block btn-info mt-5 btn-lg ml-1'
                                                            // onClick={() => updatePcSelected(item)}
                                                        >Editar
                                                            <AiTwotoneEdit className='h4 ml-2' />
                                                        </button>
                                                    </Link>
                                                </div>


          </div>
        </div>
      </div>
        </>
    )
}

export default FindPc