import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import VeiculoContext from './VeiculoContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';


function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, listaProprietarios } = useContext(VeiculoContext);

    return (
        <Dialogo id="modalEdicao" titulo="Veiculo"
            idform="formulario" acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm} setExibirForm={setExibirForm}>
            <Alerta alerta={alerta} />
            <Col xs={12} md={4}>
                <CampoEntrada value={objeto.codigo}
                    id="txtCodido" name="codigo" label="Código"
                    tipo="number" onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5} />
            </Col>
            <Col xs={12} md={8}>
                <CampoEntrada value={objeto.modelo}
                    id="txtModelo" name="modelo" label="Modelo"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o Modelo"
                    requerido={true} readonly={false}
                    maxCaracteres={50} />
            </Col>
            <Col xs={12} md={6}>
            <CampoSelect value={objeto.disponivel}
                    id="txtDisponivel" name="disponivel" label="Disponível"
                    onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe se está Disponível"
                    requerido={true}>
                    <option value={true}>Sim</option>
                    <option value={false}>Não</option>
                </CampoSelect>
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.ano}
                    id="txtAno" name="ano" label="Ano"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o Ano do Veículo"
                    requerido={true} readonly={false}
                    maxCaracteres={12} />
            </Col>
            <Col xs={12} md={12}>
                <CampoSelect value={objeto.proprietario}
                    id="txtProprietario" name="proprietario" label="Proprietario"
                    onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o Proprietario"
                    requerido={true}>
                    {listaProprietarios.map((prop) => (
                        <option key={prop.codigo} value={prop.codigo}>
                            {prop.nome}
                        </option>
                    ))}
                </CampoSelect>
            </Col>
           
        </Dialogo>
    )
}

export default Formulario;