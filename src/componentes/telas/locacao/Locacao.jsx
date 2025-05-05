import React, { useState, useEffect } from 'react';
import LocacaoContext from './LocacaoContext';
import { getVeiculosAPI } from '../../../servicos/VeiculoServico';
import { getLocacoesAPI, getLocacaoPorCodigoAPI,deleteLocacaoPorCodigoAPI, cadastraLocacaoAPI} from '../../../servicos/LocacaoServico';
import Tabela from './Tabela';
import Formulario from './Formulario'
import Carregando from '../../comuns/Carregando';

function Locacao() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaVeiculos, setListaVeiculos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const recuperaLocacoes = async () => {
        setCarregando(true);
        setListaObjetos(await getLocacoesAPI());
        setCarregando(false);
    }

    const recuperaVeiculos = async () => {
            setListaVeiculos(await getVeiculosAPI());
        }
    

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteLocacaoPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaLocacoes();
        }
    }

// novos estados e métodos
    const [editar, setEditar] = useState(false);

    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        codigo: 0, 
        data_retirada: new Date().toISOString().slice(0, 10),
        data_retorno: null,
        veiculo:""
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0, 
            data_retirada: new Date().toISOString().slice(0, 10),
            data_retorno: null,
            veiculo:""
        });
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        setObjeto(await getLocacaoPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraLocacaoAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
    
            if (retornoAPI.objeto) {
                setObjeto(retornoAPI.objeto);
            } else {
                setObjeto({
                    codigo: 0, 
                    data_retirada: new Date().toISOString().slice(0, 10),
                    data_retorno: new Date().toISOString().slice(0, 10),
                    veiculo:""
                });
            }
    
            if (!editar) {
                setEditar(true);
            }
    
            setExibirForm(false); // fecha o formulário
        } catch (err) {
            console.error(err.message);
        }
        recuperaLocacoes();
    };
    

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }





    useEffect(() => {
        recuperaLocacoes();
        recuperaVeiculos();
    }, []);

    

    return (
        <LocacaoContext.Provider value={{
            alerta, listaObjetos, remover, objeto, editarObjeto,
            acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm, listaVeiculos
        }}>
            <Carregando carregando={carregando}>
            <Tabela />
            </Carregando>
            
            <Formulario />
        </LocacaoContext.Provider>
    )
}

export default Locacao;