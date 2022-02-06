import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarCompra = () => {

    const [data, setData] = useState([]);
    const [item, setItem] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras = async () => {
        await axios.get(api + "/listascompras")
            .then((response) => {
                console.log(response.data.compras);
                setData(response.data.compras)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                // console.log("Sem conexão com a API")
            });
    };

    const getItens = async () => {
        await axios.get(api + "/listaitenscompras")
            .then((response) => {
                setItem(response.data.itemcompras)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                // console.log("Sem conexão com a API")
            });
    };

    const excluirCompra = async (id) => {

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.delete(api + "/excluircompra/" + id, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
                getCompras();
            })
            .catch(() => {
                setStatus({
                    type: "error",
                    message: "Erro: sem conexão com a API."
                })
            })
    }

    const excluirItem = async (id) => {

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.delete(api + "/excluiritemcompra/" + id, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
                getItens();
            })
            .catch(() => {
                setStatus({
                    type: "error",
                    message: "Erro: sem conexão com a API."
                })
            })
    }

    useEffect(() => {
        getCompras();
        getItens();
    }, [])


    return (
        <div>
            <Container>
                <div>
                    <h1>Visualizar informações das compras</h1>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                <hr className="m-1"></hr>
                <div>
                    <h3>Compras</h3>
                </div>
                <div className="p-2">
                    <Link to="/cadastrar-compras" className="btn btn-outline-success btn-sm">Cadastrar</Link>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>ClientId</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(comp => (
                            <tr key={comp.id}>
                                <td>{comp.id}</td>
                                <td>{comp.data}</td>
                                <td>{comp.ClienteId}</td>
                                <td className="texte-center">
                                    <Link to={"/editar-compra/" + comp.id}
                                        className="btn btn-outline-warning btn-sm m-1">
                                        Editar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm m-1" onClick={() => excluirCompra(comp.id)}>
                                        Excluir
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div>
                    <h3>Itens Compras</h3>
                </div>
                <div className="p-2">
                    <Link to="/cadastrar-itenscompra" className="btn btn-outline-success btn-sm">Cadastrar Itens</Link>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>CompraId</th>
                            <th>ProdutoId</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.map(item => (
                            <tr key={item.id}>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td>{item.CompraId}</td>
                                <td>{item.ProdutoId}</td>
                                <td>
                                    <Link to={"/editar-itemcompra/" + item.CompraId}
                                        className="btn btn-outline-warning btn-sm m-1">
                                        Editar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm m-1" onClick={() => excluirItem(item.CompraId)}>
                                        Excluir
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};