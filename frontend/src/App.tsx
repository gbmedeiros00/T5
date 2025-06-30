import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListaProdutos from './componentes/Produtos/listaProdutos.tsx';
import RegistrarConsumo from './componentes/Consumo/registrarConsumo.tsx';
import Home from './componentes/home.tsx';
import ListaRelatorios from './componentes/Relatorios/listaRelatorios.tsx';
import ListaCliente from './componentes/Clientes/listaClientes.tsx';
import ListaPets from './componentes/Pets/listaPets.tsx';
import { Container, Navbar, Nav } from 'react-bootstrap';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar bg="info" variant="dark" expand="lg">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand href="/">PetLovers</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/clientes">Clientes</Nav.Link>
              <Nav.Link as={Link} to="/pets">Pets</Nav.Link> 
              <Nav.Link as={Link} to="/produtos">Produtos</Nav.Link>
              <Nav.Link as={Link} to="/consumo">Consumo</Nav.Link>
              <Nav.Link as={Link} to="/relatorios">Relatórios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<ListaCliente tema="white" />}/>
        <Route path="/produtos" element={<ListaProdutos tema="white" />} />
        <Route path="/consumo" element={<RegistrarConsumo />} />
        <Route path="/pets" element={<ListaPets tema="white" />} /> 
        <Route path="/relatorios" element={<ListaRelatorios />} />
      </Routes>
    </BrowserRouter>
  );
}