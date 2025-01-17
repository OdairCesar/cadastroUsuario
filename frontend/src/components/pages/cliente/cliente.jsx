import React, { Component } from 'react'
import Main from '../../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'Clientes',
    subtitle: 'Cadastro de usuarios: Incluir, Listar, Alterar e Excluir!'
}

/** Estado iniciar do DB */
const baseUrl = 'http://localhost:3001/cliente'
const initialState = {
    user: {
        name: '',
        email: '',
        endereco: '',
        bairro: '',
        cep: '',
        cidade: '',
        estado: '',
        telefone: '',
        celular: '',
        sexo: '',
        data_nasc: '',
        cpf: '',
        rg: '',
        id_cartao: ''
    },
    list: []
}

export default class Cliente extends Component {

    state = { ...initialState }

    clear() {
        this.setState({ user: initialState.user })
    }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    /** Manupilar os dados do DB */
    load(user) {
        this.setState({ user })
    }

    //Reover usuario
    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    //Metodo para savar ou alterar um usuario no DB
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)
        return list
    }


    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.celular}</td>
                    <td>{user.cpf}</td>
                    <td>{user.endereco}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Celular</th>
                        <th>CPF</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Celular</label>
                            <input type="text" className="form-control"
                                name="celular"
                                value={this.state.user.celular}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o celular..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Telefone</label>
                            <input type="text" className="form-control"
                                name="telefone"
                                value={this.state.user.telefone}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Telefone..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Endereço</label>
                            <input type="text" className="form-control"
                                name="endereco"
                                value={this.state.user.endereco}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Endereço..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Bairro</label>
                            <input type="text" className="form-control"
                                name="bairro"
                                value={this.state.user.bairro}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o bairro..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" className="form-control"
                                name="cidade"
                                value={this.state.user.cidade}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a cidade..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-1">
                        <div className="form-group">
                            <label>UF</label>
                            <input type="text" className="form-control"
                                name="estado"
                                value={this.state.user.estado}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a sigla do estado..." />
                        </div>
                    </div>


                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>CEP</label>
                            <input type="text" className="form-control"
                                name="cep"
                                value={this.state.user.cep}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o CEP..." />
                        </div>
                    </div>

                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}