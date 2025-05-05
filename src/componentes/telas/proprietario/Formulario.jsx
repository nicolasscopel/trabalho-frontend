import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import ProprietarioContext from './ProprietarioContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoEntradaTextArea from '../../comuns/CampoEntradaTextArea';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm} = useContext(ProprietarioContext);

    return (
        <Dialogo id="modalEdicao" titulo="Proprietario"
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
                <CampoEntrada value={objeto.nome}
                    id="txtNome" name="nome" label="Nome"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o Nome"
                    requerido={true} readonly={false}
                    maxCaracteres={50} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.cpf}
                    id="txtCpf" name="cpf" label="CPF"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o CPF"
                    requerido={true} readonly={false} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.rg}
                    id="txtRg" name="rg" label="RG"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o RG"
                    requerido={true} readonly={false}
                    maxCaracteres={12} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntradaTextArea value={objeto.email}
                    id="txtEmail" name="email" label="Email"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o Email"
                    requerido={true} readonly={false} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.telefone}
                    id="txtTelefone" name="telefone" label="Telefone"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o Telefone"
                    requerido={true} readonly={false} />
            </Col>
            
        </Dialogo>
    )
}

export default Formulario;