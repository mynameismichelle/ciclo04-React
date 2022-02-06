import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarItemPedido = (props) => {

    console.log(props.match.params.id)

    const [id] = useState(props.match.params.id)

    const [item, setItem] = useState({
        PedidoId: '',
        quantidade: '',
        valor: ''
    });

    const valorInput = e => setItem({
        ...item,
        [e.target.name]: e.target.value
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getItem = async () => {
        await axios.get(api + "/itempedido/" + id)
            .then((response) => {
                console.log(response.data.item[0])
                setItem(response.data.item[0])
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
            });
    };

    const editItem = async e => {
        e.preventDefault();
        console.log("Editar")

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/pedidos/" + id + "/editaritem", item, { headers })
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
        getItem();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Editar Item Pedido</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/listar-pedidos" className="btn btn-outline-primary btn-sm">
                            Pedido
                        </Link>
                    </div>
                </div>
                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={editItem}>
                <FormGroup className="p2">
                        <Label>
                            Pedido ID
                        </Label>
                        <Input
                            name="PedidoId"
                            placeholder="Id do Pedido"
                            type="text"
                            defaultValue={item.PedidoId}
                            readOnly="readonly"
                            onChange={valorInput}

                        />
                    </FormGroup>
                    <FormGroup className="p2">
                        <Label>
                            Quantidade
                        </Label>
                        <Input
                            name="quantidade"
                            placeholder="Quantidade"
                            type="text"
                            defaultValue={item.quantidade}
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p2">
                        <Label>
                            Valor
                        </Label>
                        <Input
                            name="valor"
                            placeholder="Valor do item"
                            type="text"
                            defaultValue={item.valor}
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