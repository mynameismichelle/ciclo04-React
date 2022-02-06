import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarProduto = (props) => {

    console.log(props.match.params.id)

    const [id] = useState(props.match.params.id)

    const [produto, setProduto] = useState({
        id:'',
        nome: '',
        descricao: ''
    });

    const valorInput = e => setProduto({
        ...produto,
        [e.target.name]: e.target.value
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProduto = async () => {
        await axios.get(api + "/produto/" + id)
            .then((response) => {
                console.log(response.data.prod)
                setProduto(response.data.prod)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
            });
    };

    const editProduto = async e => {
        e.preventDefault();
        console.log("Editar")

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/produto/" + id + "/editar", produto, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: response.data.message
                });
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Sem conexão com a API."
                });
            });
    }

    useEffect(() => {
        getProduto();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Editar Produto</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/listar-produto" className="btn btn-outline-primary btn-sm">
                            Produto
                        </Link>
                    </div>
                </div>
                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={editProduto}>
                <FormGroup className="p2">
                        <Label>
                            ID do produto
                        </Label>
                        <Input
                            name="id"
                            placeholder="ID do produto"
                            type="text"
                            defaultValue={produto.id}
                            onChange={valorInput}
                            readOnly="readonly"
                        />
                    </FormGroup>
                    <FormGroup className="p2">
                        <Label>
                            Nome
                        </Label>
                        <Input
                            name="nome"
                            placeholder="Nome do Cliente"
                            type="text"
                            defaultValue={produto.nome}
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="p-2">
                            Descrição
                        </Label>
                        <Input
                            name="descricao"
                            placeholder="Descrição do produto"
                            type="text"
                            defaultValue={produto.descricao}
                            onChange={valorInput}
                        />
                    </FormGroup>

                    <Button type="submit" outline color="success">
                        Salvar
                    </Button>

                </Form>

            </Container>
        </div>
    );
};