import React, { useState, useEffect } from 'react';
import {FaTrash, FaPen} from 'react-icons/fa'
import { Button, Col, Form, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import api from '../../services/api';
import { notifySuccess, notifyError } from '../../utils/toastify'

import 'react-toastify/dist/ReactToastify.css';

interface Category {
    id?: number
    name: string
    parentId: number | null
    path: string
}

function CategoryAdmin () {

    const [saveModeToggle, setSaveModeToggle] = useState(true)
    const defaultCategory = {
        name: '',
        parentId: null,
        path: ''
    }

    const [category, setCategory] = useState<Category>({ ...defaultCategory })
    const [categories, setCategories] = useState<Category[]>([])
    const [id, setId] = useState(0)

    function saveCategory() {
        const idForm = id !== 0 ? `/${id}` : ''
        const method = id !== 0 ? 'put' : 'post'

        api[method](`categories${idForm}`, category)
            .then(() => {
                notifySuccess("Cadastro Realizado com Sucesso")
            }).catch((error) => {
                if(error.response) {
                    notifyError(error.response.data)
                    return
                }
            })
        resetForm()
    }

    function removeCategory() {
        api.delete(`categories/${id}`)
            .then(() => {
                notifySuccess("Categoria Removida")
            }).catch((error) => {
                if(error.response) {
                    notifyError(error.response.data)
                    return
                }
            })
    }

    function resetForm() {
        setCategory({ ...defaultCategory })
        setSaveModeToggle(true)
    }

    function loadCategory(category: Category, saveMode = true) {
        setSaveModeToggle(saveMode)
        if(category.id) {
            setId(category.id)
        }

        setCategory({
            ...category
        })
    }

    useEffect(() => {
        api.get('categories')
            .then(res => {
                setCategories(res.data)
            })
    }, [categories])

    return (
        <div className="category-admin">
            <ToastContainer />
            <Form onSubmit={(e) => {
                e.preventDefault()
            }}>
                <input id="category-id" type="hidden" name="category-id" value={id}/>
                <Form.Row>
                    <Col sm={12}>
                        <Form.Group controlId="form-category-name">
                            <Form.Label>Nome: </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Informe o Nome da Categoria" 
                                value={category.name}
                                onChange={(e) => {setCategory({...category, name: e.target.value})}}
                                readOnly={!saveModeToggle}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
                {saveModeToggle ? (
                    <Form.Row>
                        <Col sm={12}>
                            <Form.Group controlId="form-parentId">
                                <Form.Label>Categoria pai: </Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => setCategory({...category, parentId: (e.target.value !== "" ? Number.parseInt(e.target.value) : null)})}
                                >
                                    <option value=""> - </option>
                                    {categories.map((category: Category) => {
                                            return (
                                                <option value={category.id} key={category.id}>{category.path}</option>
                                            )
                                        })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Row>
                ) : null}
                <Form.Row className="mb-3">
                    <Col xs={12}>
                        {saveModeToggle ? 
                            (<Button variant="primary" type="submit" onClick={saveCategory}>Salvar</Button>) 
                            : (<Button variant="danger" onClick={removeCategory}>Excluir</Button>)}
                        <Button variant="secondary" className="ml-2" onClick={resetForm}>Cancelar</Button>
                    </Col>
                </Form.Row>
            </Form>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Caminho</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category: Category) => {
                        return(
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.path}</td>
                                <td className="table-buttons-container">
                                    <Button variant="warning" type="button" onClick={() => loadCategory(category)}><FaPen /></Button>
                                    <Button variant="danger" type="button" onClick={() => loadCategory(category, false)}><FaTrash /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default CategoryAdmin;