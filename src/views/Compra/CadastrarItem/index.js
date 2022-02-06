import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const CadastrarItemCompra = () => {

    const cadItens = async e => {
        // console.log("Cadastrar");
        e.preventDefault();

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/itenscompra", itens, { headers })
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
    const [itens, setItens] = useState({
        CompraId: '',
        ProdutoId: '',
        quantidade: '',
        valor: ''
    });

    const limpar = () => setItens({
        CompraId: '',
        ProdutoId: '',
        quantidade: '',
        valor: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItens({
        ...itens, [e.target.name]: e.target.value
    });

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Item Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-compra"
                        className="btn btn-outline-success btn-sm">Compra</Link>
                </div>
            </div>

            <hr className="m-1"></hr>

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadItens}>
                <FormGroup className="p2">
                    <Label>
                        Compra ID
                    </Label>
                    <Input
                        name="CompraId"
                        placeholder="ID da compra"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="p-2">
                        Produto ID
                    </Label>
                    <Input
                        name="ProdutoId"
                        placeholder="ID do produto"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="p-2">
                        Quantidade
                    </Label>
                    <Input
                        name="quantidade"
                        placeholder="Quantidade de itens"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="p-2">
                        Valor
                    </Label>
                    <Input
                        name="valor"
                        placeholder="Valor do pedido"
                        type="text"
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