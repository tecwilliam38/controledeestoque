import React from 'react'

import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

// Pages
import Login from '../Pages/user/login';
import Cadastro from '../Pages/user/cadastro';
import Home from '../Pages/Home';
import ConsultaPc from '../Pages/Pc/ConsultaPc';
import CadastroPc from '../Pages/Pc/CadastroPc';
import UpdatePc from '../Pages/Pc/UpdatePc';
import FindPc from '../Pages/Pc/findPc';
import Freecodecamp from '../Pages/Pc/freecodecamp';

const Rotas = () => {
  return (
    <>
    <Router>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path='Home' element={<Home />} />
            <Route path='Cadastro' element={<Cadastro />} />
            {/* <Route path='ConsultaPc' element={<Freecodecamp />} /> */}
            <Route path='ConsultaPc' element={<ConsultaPc />} />
            <Route path='CadastroPc' element={<CadastroPc />} />
            <Route path='UpdatePc/:id' element={<UpdatePc />} />
            <Route path='FindPc' element={<FindPc/>} />
        </Routes>
    </Router>
    
  </>
  )
}

export default Rotas