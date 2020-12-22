import React, {useEffect, useState} from 'react';
import { FaHome, FaFolder, FaFileAlt, FaUser } from 'react-icons/fa'
import Landing from '../template/Landing';
import axios from 'axios'

import PageTitle from '../template/PageTitle';
import Stat from './Stat';
import api from '../../services/api';

import './styles/home.css'

interface Stats {
    users: number
    articles: number
    categories: number
}

function Home() {

    const statsDefault = {
        users: 0,
        articles: 0,
        categories: 0
    }
    const [stats, setStats] = useState<Stats>({ ...statsDefault })

    useEffect(() => {

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const loadStats = () => {
            try {
                api.get('/stats', { cancelToken: source.token })
                    .then(res => {
                        setStats({
                            users: res.data.users,
                            categories: res.data.categories,
                            articles: res.data.articles
                        })
                    })
            } catch (error) {
                if(axios.isCancel(error)) {
                    console.log("Cancelado")
                } else {
                    throw error;
                }
            }
        }

        loadStats();
        return () => {
            source.cancel();
        }
    }, [stats])

    return(
        <Landing>
            <div className="home">
                <PageTitle title="Dashboard" subtitle="Base de Conhecimento">
                    <FaHome />
                </PageTitle>
                <div className="stats">
                    <Stat title="Categorias" value={ stats ? stats.categories : 0 } color="#d54d50">
                        <FaFolder />
                    </Stat>
                    <Stat title="Artigos" value={ stats ? stats.articles : 0 } color="#3bc480">
                        <FaFileAlt />
                    </Stat>
                    <Stat title="Usuários" value={ stats ? stats.users : 0 } color="#3282cd">
                        <FaUser />
                    </Stat>
                </div>            
            </div>
        </Landing>
    )
}

export default Home;