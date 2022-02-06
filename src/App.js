import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './views/Home';

import { ListarCliente } from './views/Cliente/Listar';
import { CadastrarCliente } from './views/Cliente/Cadastrar';
import { EditarCliente } from './views/Cliente/Editar';
import { PedidosCliente } from './views/Cliente/Consulta';

import { ListarServico } from './views/Servico/Listar';
import { CadastrarServico } from './views/Servico/Cadastrar';
import { EditarServico } from './views/Servico/Editar';
import { Item} from './views/Servico/Item';

import { ListarPedido } from './views/Pedido/Listar';
import { CadastrarPedido } from './views/Pedido/Cadastrar';
import { CadastrarItem } from './views/Pedido/CadastrarItem';
import { EditarPedido } from './views/Pedido/Editar';
import { EditarItemPedido } from './views/Pedido/EditarItem';

import { ListarProduto } from './views/Produto/Listar';
import { CadastrarProduto } from './views/Produto/Cadastrar';
import { EditarProduto } from './views/Produto/Editar';

import { ListarCompra} from './views/Compra/Listar';
import { CadastrarCompra } from './views/Compra/Cadastrar';
import { CadastrarItemCompra } from './views/Compra/CadastrarItem';
import { EditarCompra } from './views/Compra/Editar';
import { EditarItemCompra } from './views/Compra/EditarItem';

import { Menu } from './components/Header/Menu';
import { Footer } from './components/Footer/Footer';



function App() {
  return (
    <div className="main">
      <Router>
        <Menu/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/listar-cliente" component={ListarCliente} />
            <Route path="/cadastrar-cliente" component={CadastrarCliente} />
            <Route path="/editar-cliente/:id" component={EditarCliente} />
            <Route path="/pedidos-cliente/:id" component={PedidosCliente} />
            
            <Route path="/listar-servico" component={ListarServico} />
            <Route path="/cadastrar-servico" component={CadastrarServico} />
            <Route path="/editar-servico/:id" component={EditarServico} />
            
            <Route path="/cadastrar-pedidos" component={CadastrarPedido} />
            <Route path="/listar-pedidos" component={ListarPedido} />
            <Route path="/listar-pedido/:id" component={Item} />
            <Route path="/editar-itempedido/:id" component={EditarItemPedido} />
            <Route path="/editar-pedido/:id" component={EditarPedido} />
            <Route path="/listar-pedidos" component={ListarPedido} />
           
            <Route path="/cadastrar-itens" component={CadastrarItem} />
            <Route path="/cadastrar-itenscompra" component={CadastrarItemCompra} />
            <Route path="/cadastrar-compras" component={CadastrarCompra} />
            <Route path="/editar-compra/:id" component={EditarCompra} />
            <Route path="/editar-itemcompra/:id" component={EditarItemCompra} />
            <Route path="/listar-compra" component={ListarCompra} />
            
            <Route path="/editar-produto/:id" component={EditarProduto} />
            <Route path="/listar-produto" component={ListarProduto} />
            <Route path="/cadastrar-produto" component={CadastrarProduto} />
            
          </Switch>
        </div>
        <Footer/>
      </Router >
    </div >
  );
}

export default App;
