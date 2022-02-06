import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const CadastrarCliente = () => {

    const cadCliente = async e => {
        // console.log("Cadastrar");
        e.preventDefault();
        console.log(cliente);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/clientes", cliente, { headers })
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
    const [cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: '',
    });

    const limpar = () => setCliente({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCliente({
        ...cliente, [e.target.name]: e.target.value
    });

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Cliente</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-cliente"
                        className="btn btn-outline-success btn-sm">Clientes</Link>
                </div>
            </div>

            <hr className="m-1"></hr>

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadCliente}>
                <FormGroup className="p2">
                    <Label>
                        Nome
                    </Label>
                    <Input
                        name="nome"
                        placeholder="Nome do Cliente"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="p-2">
                        Endereço
                    </Label>
                    <Input
                        name="endereco"
                        placeholder="Endereço do Cliente"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p2">
                    <Label>
                        Cidade
                    </Label>
                    <Input
                        name="cidade"
                        placeholder="Cidade do Cliente"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p2">
                    <Label>
                        UF
                    </Label>
                    <Input
                        name="uf"
                        placeholder="UF"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p2">
                    <Label>
                        Nascimento
                    </Label>
                    <Input
                        name="nascimento"
                        placeholder="Nascimento do Cliente"
                        type="date"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup className="p2">
                    <Label>
                        Cliente Desde
                    </Label>
                    <Input
                        name="clienteDesde"
                        placeholder="Cliente Desde"
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