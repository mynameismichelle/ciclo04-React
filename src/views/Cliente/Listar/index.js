import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                // console.log("Sem conexão com a API")
            });
    };

    const excluirCliente = async (id) => {

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.delete(api + "/excluircliente/" + id, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: "Cliente excluído com sucesso!"
                });
                getClientes();
            })
            .catch(() => {
                setStatus({
                    type: "error",
                    message: "Erro: sem conexão com a API."
                })
            })
    }


    useEffect(() => {
        getClientes();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos clientes</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-cliente" className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimneto</th>
                            <th>ClienteDesde</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(cli => (
                            <tr key={cli.id}>
                                <td>{cli.id}</td>
                                <td>{cli.nome}</td>
                                <td>{cli.endereco}</td>
                                <td>{cli.cidade}</td>
                                <td>{cli.uf}</td>
                                <td>{cli.nascimento}</td>
                                <td>{cli.clienteDesde}</td>
                                <td className="texte-center">
                                    <Link to={"/pedidos-cliente/" + cli.id}
                                        className="btn btn-outline-primary btn-sm m-1">
                                        Consultar
                                    </Link>

                                    <Link to={"/editar-cliente/" + cli.id}
                                        className="btn btn-outline-warning btn-sm m-1">
                                        Editar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm m-1" onClick={() => excluirCliente(cli.id)}>
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