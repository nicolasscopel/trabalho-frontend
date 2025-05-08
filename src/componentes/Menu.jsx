import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';

function Menu() {
    return (
        <div>
            <Navbar expand="lg" className="navbar-personalizada">  
                <Container>
                    <NavLink className="navbar-brand" aria-current="page" exact="true" to="/">Agência de Locação</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link active" aria-current="page" exact="true" to="/">Home</NavLink>
                            <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                                <NavLink className="dropdown-item" exact="true" to="proprietarios">Proprietarios</NavLink>
                                <NavLink className="dropdown-item" exact="true" to="veiculos">Veiculos</NavLink>
                                <NavLink className="dropdown-item" exact="true" to="locacoes">Locações</NavLink>
                            </NavDropdown>
                            <NavLink className="nav-link active" aria-current="page" exact="true" to="/sobre">Sobre...</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Menu;