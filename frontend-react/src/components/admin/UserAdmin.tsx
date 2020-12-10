import React, { useState, useEffect } from 'react';
import {FaTrash, FaPen} from 'react-icons/fa'
import { Button, Col, Form, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import api from '../../services/api';

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
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [admin, setAdmin] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [id, setId] = useState(0)
    const [users, setUsers] = useState([])

    function resetForm() {
        setName('')
        setEmail('')
        setId(0)
        setPassword('')
        setConfirmPassword('')
        setAdmin(false)
        setSaveModeToggle(true)
    }

    function saveUser() {
        
        const idForm = id !== 0 ? `/${id}` : ''
        const method = id !==0 ? 'put' : 'post'
        
        if(method === 'post') {
            api.post('users', {
                name,
                email,
                admin,
                password,
                confirmPassword
            }).then(() => {
                notifySuccess("Cadastro realizado com sucesso")
            }).catch((err) => {
                if(err.response) {
                    notifyError(err.response.data)
                }
            })
        } else {
            api.put(`users${idForm}`, {
                name,
                email,
                admin,
                password,
                confirmPassword
            }).then(() => {
                notifySuccess("Edição realizada com sucesso")
            }).catch((err) => {
                if(err.response) {
                    notifyError(err.response.data)
                }
            })
        }

        resetForm()
        
    }

    function removeUser() {
        api.delete(`users/${id}`)
            .then(() => {
                notifySuccess("Remoção realizada com sucesso")
            }).catch((err) => {
                if(err.response) {
                    notifyError(err.response.data)
                }
            })
        
        resetForm()
    }

    function loadUser(user: User, saveMode = true) {
        setSaveModeToggle(saveMode);
        setName(user.name);
        setEmail(user.email);
        setAdmin(user.admin);
        setId(user.id);
        setPassword('')
        setConfirmPassword('')
    }

    function loadUsers() {
        api.get('/users')
            .then(res => {
                setUsers(res.data)
            })
    }

    function notifySuccess(msg: string) {
        toast.success(msg, {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,            
        })
    }

    function notifyError(msg: string) {
        toast.error(msg, {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined
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
                <input id="article-id" type="hidden" name="article-id" value={id}/>
                <Form.Row>
                    <Col sm={12} md={6}>
                        <Form.Group controlId="form-name">
                            <Form.Label>Nome: </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Informe o Nome do Usuário" 
                                value={name}
                                onChange={(e) => {setName(e.target.value)}}
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
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            readOnly={!saveModeToggle}
                        />
                    </Form.Group>
                    </Col>
                </Form.Row>
                {saveModeToggle && (
                    <Form.Check 
                        id="user-admin"
                        className="mt-3 mb-3"
                        checked={admin}
                        label="Administrador"
                        onChange={() => setAdmin(!admin)}
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
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </Form.Group>
                        </Col>
                        <Col sm={12} md={6}>
                        <Form.Group controlId="form-confirm-password">
                            <Form.Label>Confirmação de senha: </Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Confirme a Senha do Usuário" 
                                value={confirmPassword}
                                onChange={(e) => {setConfirmPassword(e.target.value)}}
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