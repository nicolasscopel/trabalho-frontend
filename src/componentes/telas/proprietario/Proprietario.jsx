import { useState, useEffect } from 'react';
import ProprietarioContext from './ProprietarioContext';
import Tabela from './Tabela';
import {
    getProprietariosAPI, getProprietarioPorCodigoAPI,
    deleteProprietarioPorCodigoAPI, cadastraProprietarioAPI
} from '../../../servicos/ProprietarioServico';

import Formulario from './Formulario'
import Carregando from '../../comuns/Carregando';

function Proprietario() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [carregando, setCarregando] = useState(true);

    const recuperaProprietarios = async () => {
        setCarregando(true);
        setListaObjetos(await getProprietariosAPI());
        setCarregando(false);
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteProprietarioPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaProprietarios();
        }
    }

// novos estados e métodos
    const [editar, setEditar] = useState(false);

    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        codigo: 0, nome: "", cpf: "", rg: "", email: "", telefone:""
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            cpf: "",
            rg: "",
            email:"",
            telefone:""
        });
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        setObjeto(await getProprietarioPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraProprietarioAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
    
            if (retornoAPI.objeto) {
                setObjeto(retornoAPI.objeto);
            } else {
                setObjeto({
                    codigo: 0,
                    nome: "",
                    cpf: "",
                    rg: "",
                    email: "",
                    telefone: ""
                });
            }
    
            if (!editar) {
                setEditar(true);
            }
    
            setExibirForm(false); // fecha o formulário
        } catch (err) {
            console.error(err.message);
        }
        recuperaProprietarios();
    };
    

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }





    useEffect(() => {
        recuperaProprietarios();
    }, []);

    

    return (
        <ProprietarioContext.Provider value={{
            alerta, listaObjetos, remover, objeto, editarObjeto,
            acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm
        }}>
            <Carregando carregando={carregando}>
            <Tabela />
            </Carregando>
            
            <Formulario />
        </ProprietarioContext.Provider>
    )
}

export default Proprietario;