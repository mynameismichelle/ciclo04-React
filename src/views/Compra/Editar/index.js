import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCompra = (props) => {

    console.log(props.match.params.id)

    const [id] = useState(props.match.params.id)

    const [compra, setCompra] = useState({
        id: '',
        data: ''
    });

    const valorInput = e => setCompra({
        ...compra,
        [e.target.name]: e.target.value
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompra = async () => {
        await axios.get(api + "/compra/" + id)
            .then((response) => {
                console.log(response.data.comp)
                setCompra(response.data.comp)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
            });
    };

    const editCompra = async e => {
        e.preventDefault();
        console.log("Editar")

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/compra/" + id + "/editar", compra, { headers })
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
        getCompra();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Editar Compra</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/listar-compra" className="btn btn-outline-primary btn-sm">
                            Compra
                        </Link>
                    </div>
                </div>
                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={editCompra}>
                    <FormGroup className="p2">
                        <Label>
                            ID da Compra
                        </Label>
                        <Input
                            name="id"
                            placeholder="Id da compra"
                            type="text"
                            defaultValue={compra.id}
                            onChange={valorInput}
                            readOnly="readonly"
                        />
                    </FormGroup>
                    <FormGroup className="p2">
                        <Label>
                            Data
                        </Label>
                        <Input
                            name="data"
                            placeholder="Data da compra"
                            type="date"
                            defaultValue={compra.data}
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