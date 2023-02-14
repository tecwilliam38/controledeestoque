import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import api from '../../db/axiosConfig'
import Menu from '../Navbar';

import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";

import { Link } from 'react-router-dom';

// Import do Toastify (popup no centro)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConsultaPc = () => {
    const navigate = useNavigate();
    const [asset, setAsset] = useState('');
    const [serviceTag, setServiceTag] = useState("");
    const [disp, setDisp] = useState("");
    const [user, setUser] = useState("");
    const [status, setStatus] = useState("");
    const [msg, setMsg] = useState("");
    const [data, setData] = useState([]);
    const [id, setId] = useState(0);
    const [inputSrc, setInputSrc] = useState('');
    const [q, setQ] = useState("");
    const [searchParam] = useState("asset");
    const [items, setItems] = useState([]);
    const [filterParam, setFilterParam] = useState("asset");
    const [searchFilter, setSearchFilter] = useState([]);
    const [result, setResult] = useState("");

    useEffect(() => {
        async function getAllPcs() {
            const response = await api.get("/cadastroPc")
            setData(response.data);
            setItems(response.data);
            setSearchFilter(response.data);
        }
        getAllPcs();
    }, [])

    useEffect(() => {
        const results = searchFilter.filter((resp) =>
            resp.name.toLowerCase().includes(asset)
        );
        setData(results);
    }, [asset]);

    const onChange = (evt) => {
        setAsset(evt.target.value);
    };


    const dataSearch = Object.values(items);

    // function search(items) {
    //     return items.filter((item) => {
    //         if (item.region == filterParam) {
    //             return searchParam.some((newItem) => {
    //                 return (
    //                     item[newItem]
    //                         .toString()
    //                         .toLowerCase()
    //                         .indexOf(q.toLowerCase()) > -1
    //                 );
    //             });
    //         } else if (filterParam == "All") {
    //             return searchParam.some((newItem) => {
    //                 return (
    //                     item[newItem]
    //                         .toString()
    //                         .toLowerCase()
    //                         .indexOf(q.toLowerCase()) > -1
    //                 );
    //             });
    //         }
    //     });
    // }






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
        localStorage.setItem(id);
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
                <div className="py-2 mt-2 rounded-top bg-table-cadastro container">
                    <div className="col-12">
                        {data.map((item) => {
                            return (
                                <>
                                    <div className='py-2 container rounded mb-2 border-bottom' key={item.id}>
                                        <div className="row px-3">
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Asset</label>
                                                <input type="text" className="form-control" placeholder="Asset"
                                                    value={item.asset} onChange={(e) => setAsset(e.target.value)} />
                                            </div>
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Service tag</label>
                                                <input type="text" className="form-control" placeholder="Service tag"
                                                    value={item.serviceTag} onChange={(e) => setServiceTag(e.target.value)} />
                                            </div>
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Disponibilidade</label>
                                                <select className="form-control" id="exampleFormControlSelect1"
                                                    value={item.disp} onChange={(e) => setDisp(e.target.value)}>
                                                    <option value={"selected"}>Selecionar</option>
                                                    <option>Disponível</option>
                                                    <option>Indisponível</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row pb-3 px-3">
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Usuário</label>
                                                <input type="text" className="form-control" placeholder="Usuário"
                                                    value={item.user} onChange={(e) => setUser(e.target.value)} />
                                            </div>
                                            <div className="col pb-3">
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Estado</label>
                                                <select className="form-control" id="exampleFormControlSelect1"
                                                    value={item.status} onChange={(e) => setStatus(e.target.value)}>
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
                                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Observação</label>
                                                <textarea type='text' rows={1} className='form-control' placeholder='Observação'
                                                    value={item.msg} onChange={(e) => setMsg(e.target.value)} />
                                            </div>
                                            <div className="col d-flex justify-content-around">
                                                <button type='submit'
                                                    className='btn btn-block btn-danger mt-5 btn-lg ml-1'
                                                    onClick={() => handleDelete(item._id)}
                                                >Excluir
                                                    <AiTwotoneDelete className='h4 ml-2' />
                                                </button>
                                                <Link to={{ pathname: `/UpdatePc/${item._id}` }}>
                                                    <button type='submit'
                                                        className='btn btn-block btn-info mt-5 btn-lg ml-1'
                                                        onClick={() => updatePcSelected(item)}
                                                    >Editar
                                                        <AiTwotoneEdit className='h4 ml-2' />
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConsultaPc;

