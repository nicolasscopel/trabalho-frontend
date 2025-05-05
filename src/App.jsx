import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from "./componentes/Menu";
import Home from "./componentes/telas/Home";
import Sobre from "./componentes/telas/Sobre";
import Proprietario from "./componentes/telas/proprietario/Proprietario";
import Veiculo from "./componentes/telas/veiculo/Veiculo";
import Locacao from "./componentes/telas/locacao/Locacao";




const router = createBrowserRouter([
  {
    path : "/",
    element : <Menu/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "/sobre",
        element : <Sobre/>
      },
      {
        path : "proprietarios",
        element : <Proprietario/>
      },
      {
        path : "veiculos",
        element : <Veiculo/>
      },
      {
        path : "locacoes",
        element : <Locacao/>
      }

    ]
  }
])


function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
