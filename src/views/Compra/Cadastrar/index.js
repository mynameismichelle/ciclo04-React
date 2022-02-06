import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const CadastrarCompra = () => {

    const cadCompras = async e => {
        // console.log("Cadastrar");
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/compras", compra, { headers })
            .then((response) => {
                console.log(response.data.message)
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    })
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    })
                }
            })
            .catch((err) => {
                console.log("Erro: Sem conexação com a API")
                console.log(err)
            });

    };
    const [compra, setCompra] = useState({
        ClienteId: '',
        data: ''
    });

    const limpar = () => setCompra({
        ClienteId: '',
        data: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCompra({
        ...compra, [e.target.name]: e.target.value
    });

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Pedido</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-compra"
                        className="btn btn-outline-success btn-sm">Compras</Link>
                </div>
            </div>

            <hr className="m-1"></hr>

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCompras}>
                <FormGroup className="p2">
                    <Label>
                        Nome
                    </Label>
                    <Input
                        name="ClienteId"
                        placeholder="ID do Cliente"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="p-2">
                        Data
                    </Label>
                    <Input
                        name="data"
                        placeholder="Data do pedido"
                        type="date"
                        onChange={valorInput}
                    />
                </FormGroup>

                <Button type="submit" outline color="success">
                    Cadastrar
                </Button>
                <Button type="reset" outline color="danger" onClick={limpar} className="m-2">
                    Limpar
                </Button>
            </Form>
        </Container>

    )
}