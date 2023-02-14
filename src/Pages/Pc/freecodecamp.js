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
    const [error, setError] = useState(null);
    const [asset, setAsset] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    // const [searchParam] = useState(["capital", "name", "numericCode"]);
    const [searchParam] = useState("asset");
    // const [filterParam, setFilterParam] = useState(["All"]);
    const [filterParam, setFilterParam] = useState(["All"]);


    useEffect(() => {
        async function getAllPcs() {
            const response = await api.get("/cadastroPc")
            // setData(response.data);
            setItems(response.data);
        }
        getAllPcs();
    }, [])

    const dataSearch = Object.values(items);

    function search(items) {
        return items.filter((item) => {
            if (item.region == filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    return (
        <>
            <div className='bg-login'>
                <ToastContainer
                    className="toast-style"
                    closeOnClick
                    position="top-center" />
                <Menu />
                <div className="row bg-table-cadastro m-2">
                    <div className="col-2 border-right border-dark">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <div className="col pb-3" >
                                <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Pesquisar equipamento:</label>
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Asset"
                                    value={q}
                                    onChange={(e) => setQ(e.target.value)}
                                    name="search-form"
                                    id="search-form"
                                />
                            </div>
                            <div className="col pb-3">
                                                    <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Estado</label>
                                                    <select className="form-control" id="exampleFormControlSelect1"
                                                         onChange={(e) => setFilterParam(e.target.value)}>
                                                        <option value="All" selected>Selecionar</option>
                                                        <option value="Asset">Asset</option>
                                                        <option value="serviceTag">Service Tag</option>
                                                        <option value="user">Usuário</option>
                                                        <option value="msg">Mensagem</option>
                                                        <option value="status">Status</option>
                                                        <option value="disp">Disponibilidade</option>
                                                        <option value="All">Nenhum...</option>
                                                    </select>
                                                </div>
                        </div>
                        {search(dataSearch).map((item) => (
                            <>
                                <div className='py-2 container rounded mb-2 border-bottom' key={item.id}>
                                    <div className="row px-3">
                                        <div className="col pb-3">
                                            <label htmlFor="inputEmail4" className='text-light px-1 py-2'>Asset</label>
                                            <input type="text" className="form-control" placeholder="Asset"
                                                value={item.asset} onChange={(e) => setAsset(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConsultaPc
