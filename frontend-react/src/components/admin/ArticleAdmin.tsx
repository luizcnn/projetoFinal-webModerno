import React, { useState, useEffect } from 'react';
import {FaTrash, FaPen} from 'react-icons/fa'
import { Button, Col, Form, Table } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import api from '../../services/api';
import { notifySuccess, notifyError } from '../../utils/toastify'

interface Article {
    id?: number
    name: string
    description: string
    imageUrl?: string | null
    categoryId: number
    userId: number
}

interface Category {
    id?: number
    name: string
    parentId: number | null
    path: string
}

interface User {
    id?: number
    name: string
    email: string
    admin: boolean
    password: string
    confirmPassword: string
}

function ArticleAdmin() {

    const [saveModeToggle, setSaveModeToggle] = useState(true)
    const [id, setId] = useState(0)
    const articleDefault = {
        name: '',
        description: '',
        imageUrl: null,
        categoryId: 0,
        userId: 0
    }

    const [article, setArticle] = useState<Article>({ ...articleDefault })
    const [articles, setArticles] = useState<Article[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [users, setUsers] = useState<User[]>([])

    function saveArticle () {
        const idForm = id !== 0 ? `/${id}` : ''
        const method = id !== 0 ? 'put' : 'post'

        api[method](`articles${idForm}`, article)
            .then(() => {
                notifySuccess("Cadastro de artigo realizado")
                resetForm()
            }).catch(error => {
                if(error.response) {
                    notifyError(error.response.data)
                    resetForm()
                    return
                }
            })
        
    }

    function removeArticle () {
        api.delete(`articles/${id}`)
            .then(() => {
                notifySuccess("Artigo removido com sucesso")
                resetForm()
            }).catch((error) => {
                if(error.response) {
                    notifyError(error.response.data)
                    resetForm()
                    return
                }
            })
    }

    function resetForm() {
        setArticle({ ...articleDefault })
        setSaveModeToggle(true)
    }

    function loadArticle(article: Article, saveMode = true) {
        setSaveModeToggle(saveMode)
        if(article.id) setId(article.id)
        api.get(`articles/${article.id}`)
            .then(res => {
                setArticle({...res.data})
            })
    }

    function loadUsers() {
        api.get('/users')
            .then(res => {
                setUsers(res.data)
            })
    }

    function loadCategories() {
        api.get('categories')
            .then(res => {
                setCategories(res.data)
            })
    }

    function loadArticles() {
        api.get('articles')
            .then(res => {
                setArticles(res.data.data)
            })
    }

    useEffect(() => {
        loadUsers()
        loadCategories()
        loadArticles()
    }, [articles])

    return (
        <div className="article-admin">
            <ToastContainer />
            <Form
                onSubmit={(e) => {
                    e.preventDefault()
                    console.log(article)
                }}
            >
                <input id="article-id" type="hidden" name="article-id" value={id}/>
                <Form.Row>
                    <Col sm={12}>
                        <Form.Group controlId="form-article-name">
                            <Form.Label>Nome: </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Informe o Nome do Artigo" 
                                value={article.name}
                                onChange={(e) => {setArticle({...article, name: e.target.value})}}
                                readOnly={!saveModeToggle}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col sm={12}>
                        <Form.Group controlId="form-article-description">
                            <Form.Label>Descrição: </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Informe a Descrição do Artigo" 
                                value={article.description}
                                onChange={(e) => {setArticle({...article, description: e.target.value})}}
                                readOnly={!saveModeToggle}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col sm={12}>
                        <Form.Group controlId="form-article-imageUrl">
                            <Form.Label>Imagem(URL): </Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Informe a URL da Imagem do Artigo" 
                                onChange={(e) => {setArticle({...article, imageUrl: (e.target.value !== '' ? e.target.value : null)})}}
                                readOnly={!saveModeToggle}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
                {saveModeToggle ? (
                    <Form.Row>
                        <Col sm={12}>
                            <Form.Group controlId="form-categoryId">
                                <Form.Label>Categoria: </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={article.categoryId}
                                    onChange={(e) => setArticle({...article, categoryId: Number.parseInt(e.target.value)})}
                                >
                                    <option value=""></option>
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
                {saveModeToggle ? (
                    <Form.Row>
                        <Col sm={12}>
                            <Form.Group controlId="form-userId">
                                <Form.Label>Categoria: </Form.Label>
                                <Form.Control
                                    as="select"
                                    value={article.userId}
                                    onChange={(e) => setArticle({...article, userId: Number.parseInt(e.target.value)})}
                                >
                                    <option value=""></option>
                                    {users.map((user: User) => {
                                            return (
                                                <option value={user.id} key={user.id}>{`${user.name} - ${user.email}`}</option>
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
                            (<Button variant="primary" type="submit" onClick={saveArticle}>Salvar</Button>) 
                            : (<Button variant="danger" onClick={removeArticle}>Excluir</Button>)}
                        <Button variant="secondary" className="ml-2" onClick={resetForm}>Cancelar</Button>
                    </Col>
                </Form.Row>
            </Form>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article: Article) => {
                        return(
                            <tr key={article.id}>
                                <td>{article.id}</td>
                                <td>{article.name}</td>
                                <td>{article.description}</td>
                                <td className="table-buttons-container">
                                <Button variant="warning" type="button" onClick={() => loadArticle(article)}><FaPen /></Button>
                                    <Button variant="danger" type="button" onClick={() => loadArticle(article, false)}><FaTrash /></Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default ArticleAdmin;