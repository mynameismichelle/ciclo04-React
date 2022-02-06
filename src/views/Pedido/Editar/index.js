import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarPedido = (props) => {

    console.log(props.match.params.id)

    const [id] = useState(props.match.params.id)

    const [pedido, setPedido] = useState({
        data: ''
    });

    const valorInput = e => setPedido({
        ...pedido,
        [e.target.name]: e.target.value
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedido = async () => {
        await axios.get(api + "/pedido/" + id)
            .then((response) => {
                console.log(response.data.ped)
                setPedido(response.data.ped)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
            });
    };

    const editPedido = async e => {
        e.preventDefault();
        console.log("Editar")

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/pedido/" + id + "/editar", pedido, { headers })
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
        getPedido();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Editar Pedido</h1>
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

                <Form className="p-2" onSubmit={editPedido}>
                    <FormGroup className="p2">
                        <Label>
                            Data
                        </Label>
                        <Input
                            name="data"
                            placeholder="Data da compra"
                            type="date"
                            defaultValue={pedido.data}
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