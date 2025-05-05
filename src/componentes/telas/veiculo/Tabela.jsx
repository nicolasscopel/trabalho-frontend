import { useContext } from 'react'
import VeiculoContext from './VeiculoContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function Tabela() {

    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(VeiculoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Veículos</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {listaObjetos.length === 0 && <h1>Nenhum veículo encontrado</h1>}
            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{
                                textAlign: 'center'
                            }}>Ações</th>
                            <th>Código</th>
                            <th>Modelo</th>
                            <th>Disponível</th>
                            <th>Ano</th>
                            <th>Proprietário</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.codigo}>
                                <td align="center">


                                    <Button variant="danger" onClick={() => { remover(objeto.codigo); }}>
                                        <i className="bi bi-trash"></i>
                                    </Button>

                                    <Button variant="info" onClick={() => editarObjeto(objeto.codigo)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.modelo}</td>
                                <td>{objeto.disponivel ? 'SIM' : 'NÃO'}</td>
                                <td>{objeto.ano}</td>
                                <td>{objeto.proprietario_nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;