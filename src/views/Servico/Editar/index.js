import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarServico = (props) => {

    console.log(props.match.params.id)

    const [id] = useState(props.match.params.id)

    const [servico, setServico] = useState({
        id:'',
        nome: '',
        descricao: ''
    });

    const valorInput = e => setServico({
        ...servico,
        [e.target.name]: e.target.value
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getServico = async () => {
        await axios.get(api + "/servico/" + id)
            .then((response) => {
                console.log(response.data.serv)
                setServico(response.data.serv)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
            });
    };

    const editServico = async e => {
        e.preventDefault();
        console.log("Editar")

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/servico/" + id + "/editar", servico, { headers })
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
        getServico();
    }, [])


    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Editar Serviço</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/listar-servico" className="btn btn-outline-primary btn-sm">
                            Serviço
                        </Link>
                    </div>
                </div>
                <hr className="m-1" />

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}

                <Form className="p-2" onSubmit={editServico}>
                <FormGroup className="p2">
                        <Label>
                            ID do Serviço
                        </Label>
                        <Input
                            name="id"
                            placeholder="Id do serviço"
                            type="text"
                            defaultValue={servico.id}
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
                            defaultValue={servico.nome}
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label className="p-2">
                            Descrição
                        </Label>
                        <Input
                            name="descricao"
                            placeholder="Endereço do Cliente"
                            type="text"
                            defaultValue={servico.descricao}
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