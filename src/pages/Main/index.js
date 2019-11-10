import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container, Form, SubmitButton, List } from './styles';

import api from '../../services/api';

export default class Main extends Component {

  state = {
    newRepository: '',
    repositories: [],
    loading: false,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
      const repositories = localStorage.getItem('repositories');

      // se caso houver alterações
      if (repositories) {
                                      // convertendo de volta a estrutura antiga
        this.setState({ repositories: JSON.parse(repositories) });
      }
  }

  // Salvar os dados do localStorage [ indentifica as mudanças de estados ]
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    // [ indsentifica as mudanças de estados ]
    if (prevState.repositories !== repositories) {
                                   // this.state.repositories

      // JSON: não aceita "ArrayList" apenas "string"
      localStorage.setItem("repositories", JSON.stringify(repositories));
    }
  }

  // armazenando o valor do "input" dentro da váriavel "newRepository". 
  handleInputChange = event => {
    this.setState({ newRepository: event.target.value });
  }

  // submit
  handleSubmit = async event => {
    // anular o procedimento padrão do "form"
    event.preventDefault();

    // status de loading
    this.setState({ loading: true });

    const { newRepository, repositories } = this.state;

    const response = await api.get(`/repos/${newRepository}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({ 
      repositories: [...repositories, data],
      newRepository: '',
     loading: false,
     });
  };


  // Renderização

 render() {
    const { newRepository, repositories, loading} = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repository
        </h1>

        <Form onSubmit={this.handleSubmit} >
            <input 
            type="text"
            placeholder="Add repository"
            value={newRepository}
            onChange={this.handleInputChange}
            />

            <SubmitButton loading={loading ? 1 : 0}>

              {
               loading ?
                <FaSpinner color="#fff"size={14} /> 
                
                : 

                <FaPlus color="#fff" size={14} /> 
              }

            </SubmitButton>
        </ Form>

               {/* Listagem de Repositorios */}
              <List>
                {repositories.map(repository => ( 
                  <li key={repository.name}>
                   <span>{repository.name}</span>
                   <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Details</Link>
                  </li>
                ))}
              </ List>
      </Container>
    );
  }
}
