import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ListarProduto = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProdutos = async () => {
        await axios.get(api + "/listasprodutos")
            .then((response) => {
                console.log(response.data.produtos);
                setData(response.data.produtos)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                // console.log("Sem conexão com a API")
            });
    };

    const excluirProduto = async (id) => {

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.delete(api + "/excluirproduto/" + id, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
                getProdutos();
            })
            .catch(() => {
                setStatus({
                    type: "error",
                    message: "Erro: sem conexão com a API."
                })
            })
    }

    useEffect(() => {
        getProdutos();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Visualizar informações dos Produtos</h1>
                    </div>
                    <div className=" m-auto p-2">
                        <Link to="cadastrar-produto" className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="texte-center">
                                    <Link to={"/editar-produto/" + item.id}
                                        className="btn btn-outline-warning btn-sm m-1">
                                        Editar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm m-1" onClick={() => excluirProduto(item.id)}>
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