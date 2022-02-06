import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config";

export const CadastrarServico = () => {

    const cadServico = async e => {
        // console.log("Cadastrar");
        e.preventDefault();
        console.log(servico);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.post(api + "/servicos", servico, { headers })
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
            .catch(() => {
                console.log("Erro: Sem conexação com a API")
            })

    }
    const [servico, setServico] = useState({
        nome: '',
        descricao: ''
    });

    const limpar = () => ({
        nome: '',
        descricao: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setServico({
        ...servico, [e.target.name]: e.target.value
    });

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar Serviço</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-servico"
                        className="btn btn-outline-success btn-sm">Serviços</Link>
                </div>
            </div>

            <hr className="m-1"></hr>

            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

            <Form className="p-2" onSubmit={cadServico}>
                <FormGroup className="p2">
                    <Label>
                        Nome
                    </Label>
                    <Input
                        name="nome"
                        placeholder="Nome do Serviço"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                <FormGroup>
                    <Label className="p-2">
                        Descrição
                    </Label>
                    <Input
                        name="descricao"
                        placeholder="Descrição do Serviço"
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