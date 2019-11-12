import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../Components/Container';

import { Loading, Owner, IssueList, IssuesFilter, PageActions } from './styles';

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
        filters: [
          { state: 'all', label: 'All', active: true},
          { state: 'open', label: 'Open', active: false},
          { state: 'closed', label: 'Closed', active: false},
        ],
        filterIndex: 0,
        page: 1,
    };
    
   async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    // decodeURIComponent: configura a barra [ / ] ao requerir o nome do repositório
    const repositoryName = decodeURIComponent(match.params.repository);
  
    // fazer as duas chamadas serem executas ao mesmo tempo
    // issues: comentarios do GitHub
    const [ repository, issues ] = await Promise.all([ 
      api.get(`/repos/${repositoryName}`),
      api.get(`/repos/${repositoryName}/issues`, {
        params: {
          state: filters.find(filter => filter.active).state,
          per_page: 5, // blocos de issues a serem mostradas por página
        },
      }),
    ]);

     this.setState({ 
       repository: repository.data,
       issues: issues.data,
       loading: false,
      });
   }

   loadIssues = async () => {
     const { match } = this.props;
     const { filters, filterIndex, page } = this.state;

     const repositoryName = decodeURIComponent(match.params.repository); 

     const response = await api.get(`/repos/${repositoryName}/issues`, {
       params: {
         state: filters[filterIndex].state,
         per_page: 5,
         page,
       },
     });

     this.setState({ issues: response.data });
   };

   handleFilterClick = async filterIndex => {
     await this.setState({ filterIndex });
     this.loadIssues();
   };

   // rolagem de páginas
   handlePage = async action => {
     const { page } = this.state;
     await this.setState({
       page: action === 'previous' ? page - 1 : page + 1,
     });

     this.loadIssues();
   };

    render() {
      const { repository, issues, loading, filters, filterIndex, page } = this.state;

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
                  <IssuesFilter active={filterIndex} >
                      {filters.map((filter, index) => (
                        <button  type="button" key={filter.label} 
                                onClick={() => this.handleFilterClick(index)} >
                          {filter.label}
                        </button>
                      ))}

                  </IssuesFilter>
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
                
                  <PageActions>              
                    <button
                      type="button"
                      disabled={page < 2}
                      onClick={() => this.handlePage('previous')} >  
                              Previous
                    </button>
                    
                        <span>Page {page}</span>
                        <button type="button" onClick={() => this.handlePage('next')}>
                          Next
                        </button>                       
                  </PageActions>
             </Container>
      );
    }
}
