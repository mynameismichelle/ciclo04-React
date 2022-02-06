import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto">
                        <div className="p-2"><h1>Home</h1></div>
                    </div>
                    <div className="m-auto d-flex">
                        <div className="p-2">
                            <a href="/listar-cliente"
                                className="btn btn-outline-success btn-sm">
                                Cliente
                            </a>
                        </div>
                        <div className="p-2">
                            <a href="/listar-pedidos"
                                className="btn btn-outline-success btn-sm">
                                Pedido
                            </a>
                        </div>
                        <div className="p-2">
                            <a href="/listar-servico"
                                className="btn btn-outline-success btn-sm">
                                Serviço
                            </a>
                        </div>
                        <div className="p-2">
                            <a href="/listar-produto"
                                className="btn btn-outline-success btn-sm">
                                Produto
                            </a>
                        </div>
                        <div className="p-2">
                            <a href="/listar-compra"
                                className="btn btn-outline-success btn-sm">
                                Compra
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};