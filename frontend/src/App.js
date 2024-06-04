import logo from './logo.svg';
import './App.css';
import ClienteComponent from './components/Cliente/ClienteComponent';
import ProdutoComponent from './components/Produto/ProdutoComponent';
import PedidoComponent from './components/Pedido/PedidoComponent';

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/clientes" component={ClienteComponent} />
          <Route path="/produtos" component={ProdutoComponent} />
          <Route path="/pedidos" component={PedidoComponent} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;