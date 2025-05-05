import React, { useState, useEffect } from 'react';
import VeiculoContext from './VeiculoContext';
import { getProprietariosAPI } from '../../../servicos/ProprietarioServico';
import { getVeiculosAPI, getVeiculoPorCodigoAPI,deleteVeiculoPorCodigoAPI, cadastraVeiculoAPI} from '../../../servicos/VeiculoServico';
import Tabela from './Tabela';
import Formulario from './Formulario'
import Carregando from '../../comuns/Carregando';

function Veiculo() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaProprietarios, setListaProprietarios] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const recuperaVeiculos = async () => {
        setCarregando(true);
        setListaObjetos(await getVeiculosAPI());
        setCarregando(false);
    }

    const recuperaProprietarios = async () => {
            setListaProprietarios(await getProprietariosAPI());
        }
    

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteVeiculoPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaVeiculos();
        }
    }

// novos estados e métodos
    const [editar, setEditar] = useState(false);

    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        codigo: 0, 
        modelo: "", 
        disponivel: true, 
        ano: "", 
        proprietario: ""
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            modelo: "",
            disponivel: true,
            ano: "",
            proprietario:""
        });
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        setObjeto(await getVeiculoPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraVeiculoAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
    
            if (retornoAPI.objeto) {
                setObjeto(retornoAPI.objeto);
            } else {
                setObjeto({
                    codigo: 0,
                    modelo: "",
                    disponivel: true,
                    ano: "",
                    proprietario: ""
                });
            }
    
            if (!editar) {
                setEditar(true);
            }
    
            setExibirForm(false); // fecha o formulário
        } catch (err) {
            console.error(err.message);
        }
        recuperaVeiculos();
    };
    

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }





    useEffect(() => {
        recuperaVeiculos();
        recuperaProprietarios();
    }, []);

    

    return (
        <VeiculoContext.Provider value={{
            alerta, listaObjetos, remover, objeto, editarObjeto,
            acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm, listaProprietarios
        }}>
            <Carregando carregando={carregando}>
            <Tabela />
            </Carregando>
            
            <Formulario />
        </VeiculoContext.Provider>
    )
}

export default Veiculo;