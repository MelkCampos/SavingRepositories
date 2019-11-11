import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../Components/Container';

import { Loading, Owner, IssueList } from './styles';

export default class Repository extends Component {

    static propTypes = {
      match: PropTypes.shape({
        params: PropTypes.shape({
          repository: PropTypes.string,
        }),
      }).isRequired, // tudo será obrigatorio 
    };

    // carregamento da API
    state = {
        repository: {},
        issues: [],
        loading: true,
    };
    
   async componentDidMount() {
    const { match } = this.props;

    // decodeURIComponent: configura a barra [ / ] ao requerir o nome do repositório
    const repositoryName = decodeURIComponent(match.params.repository);
  
    // fazer as duas chamadas serem executas ao mesmo tempo
    // issues: comentarios do GitHub
    const [ repository, issues ] = await Promise.all([ 
      api.get(`/repos/${repositoryName}`),
      api.get(`/repos/${repositoryName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

     this.setState({ 
       repository: repository.data,
       issues: issues.data,
       loading: false,
      });
   }

    render() {
      const { repository, issues, loading } = this.state;

      if(loading) {
        return <Loading>Loading</Loading>
      }

      return ( <Container> 
                {/* Informações do Repositório e de seu Criador */}

                <Owner>   
                <Link to="/" >Back to repositories</ Link>                             {/* Login do GitHUb */}
                  <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                  {/* 
                  Repository: infromações do repositório
                  Owner: informações do dono
                  Avatar_url: avatar do GitHub
                  */}

                <h1>{repository.name}</h1>
                <p>{repository.description}</p>

                </Owner>

                
                <IssueList>
                    {issues.map(issue => (
                      <li key={String(issue.id)}>
                          <img src={issue.user.avatar_url} alt={issue.user.login} />
                          <div>
                            <strong>
                              {/* html_url: redireciona para o GitHub-
                               */}
                               <a href={issue.html_url}>{issue.title}</a>
                              {issue.labels.map(label => (
                              <span key={String(label.id)}>{label.name}</span>
                              ))}
                            </strong>
                              <p>{issue.user.login}</p>
                          </div>
                      </li>
                    ))}
                </IssueList>

             </Container>
      );
    }
}
