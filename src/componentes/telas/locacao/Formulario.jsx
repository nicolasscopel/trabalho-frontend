import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import LocacaoContext from './LocacaoContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';


function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, listaVeiculos } = useContext(LocacaoContext);

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
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.data_retirada}
                    id="txtDataRetirada" name="data_retirada" label="Data de retirada"
                    tipo="date" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a data de retirada"
                    requerido={true} readonly={false} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.data_retorno}
                    id="txtDataRetorno" name="data_retorno" label="Data de retorno"
                    tipo="date" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a data de retorno"
                    requerido={false} readonly={false} />
            </Col>
            <Col xs={12} md={12}>
                <CampoSelect value={objeto.veiculo}
                    id="txtVeiculo" name="veiculo" label="Veículo"
                    onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o Veículo"
                    requerido={true}>
                    {listaVeiculos.map((veic) => (
                        <option key={veic.codigo} value={veic.codigo}>
                            {veic.modelo}
                        </option>
                    ))}
                </CampoSelect>
            </Col>
           
        </Dialogo>
    )
}

export default Formulario;