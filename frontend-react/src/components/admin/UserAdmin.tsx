import React, { useState, useEffect } from 'react';
import {FaTrash, FaPen} from 'react-icons/fa'
import { Button, Col, Form, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import api from '../../services/api';
import { notifySuccess, notifyError } from '../../utils/toastify'

import './styles/userAdmin.css'
import 'react-toastify/dist/ReactToastify.css';

interface User {
    id: number
    name: string
    email: string
    admin: boolean
    password: string
    confirmPassword: string
}

function UserAdmin() {
    const [saveModeToggle, setSaveModeToggle] = useState(true)
    const defaultUser = {
        id: 0,
        name: '',
        email: '',
        admin: false,
        password: '',
        confirmPassword: ''
    }
    
    const [user, setUser] = useState<User>({ ...defaultUser })
    const [users, setUsers] = useState([])

    function resetForm() {
        setUser({ ...defaultUser })

        setSaveModeToggle(true)
    }

    function saveUser() {
         
        const idForm = user.id !== 0 ? `/${user.id}` : ''
        const method = user.id !==0 ? 'put' : 'post'

        api[method](`users${idForm}`, user)
            .then(() => {
                notifySuccess("Cadastro realizado com sucesso")
            }).catch((error) => {
                if(error.response) {
                    notifyError(error.response.data)
                }
            })
        
        resetForm()
        
    }

    function removeUser() {
        api.delete(`users/${user.id}`)
            .then(() => {
                notifySuccess("Remoção realizada com sucesso")
            }).catch((error) => {
                if(error.response) {
                    notifyError(error.response.data)
                }
            })
        
        resetForm()
    }

    function loadUser(user: User, saveMode = true) {
        setSaveModeToggle(saveMode);
        setUser({
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            password: '',
            confirmPassword: ''
        })
    }

    function loadUsers() {
        api.get('/users')
            .then(res => {
                setUsers(res.data)
            })
    }

    useEffect(() => {
        loadUsers()
    }, [users])

    return (
        <div className="user-admin">
            <ToastContainer />
            <Form onSubmit={(e) => {
                e.preventDefault()
            }}>
                <input id="article-id" type="hidden" name="article-id" value={user.id}/>
                <Form.Row>
                    <Col sm={12} md={6}>
                        <Form.Group controlId="form-name">
                            <Form.Label>Nome: </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Informe o Nome do Usuário" 
                                value={user.name}
                                onChange={(e) => {setUser({...user, name: e.target.value})}}
                                readOnly={!saveModeToggle}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={12} md={6}>
                    <Form.Group controlId="form-email">
                        <Form.Label>E-mail: </Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Informe o E-mail do Usuário" 
                            value={user.email}
                            onChange={(e) => {setUser({...user, email: e.target.value})}}
                            readOnly={!saveModeToggle}
                        />
                    </Form.Group>
                    </Col>
                </Form.Row>
                {saveModeToggle && (
                    <Form.Check 
                        id="user-admin"
                        className="mt-3 mb-3"
                        checked={user.admin}
                        label="Administrador"
                        onChange={(e) => {setUser({...user, admin: !user.admin})}}
                        readOnly={!saveModeToggle}
                    />
                )}
                {saveModeToggle && (
                    <Form.Row>
                        <Col sm={12} md={6}>
                            <Form.Group controlId="form-password">
                                <Form.Label>Senha: </Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Informe a Senha" 
                                    value={user.password}
                                    onChange={(e) => {setUser({...user, password: e.target.value})}}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                        <Form.Group controlId="form-confirm-password">
                            <Form.Label>Confirmação de senha: </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirme a Senha do Usuário" 
                                value={user.confirmPassword}
                                onChange={(e) => {setUser({...user, confirmPassword: e.target.value})}}
                            />
                        </Form.Group>
                        </Col>
                    </Form.Row>
                )}
                <Form.Row className="mb-3">
                    <Col xs={12}>
                        {saveModeToggle ? 
                            (<Button variant="primary" type="submit" onClick={saveUser}>Salvar</Button>) 
                            : (<Button variant="danger" onClick={removeUser}>Excluir</Button>)}
                        <Button variant="secondary" className="ml-2" onClick={resetForm}>Cancelar</Button>
                    </Col>
                </Form.Row>
            </Form>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Administrador</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User) => {
                        return(
                            <tr key={user.email}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.admin ? "Sim" : "Não"}</td>
                                <td className="table-buttons-container">
                                    <Button variant="warning" type="button" onClick={() => loadUser(user)}><FaPen /></Button>
                                    <Button variant="danger" type="button" onClick={() => loadUser(user, false)}><FaTrash /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default UserAdmin;