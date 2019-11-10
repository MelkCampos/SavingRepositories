import React, { Component } from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default class Repository extends Component {

    state = {
        repository: {},
        issues: [],
        loading: true,
    };
    
   async componentDidMount() {
    const { match } = this.props;

    const repositoryName = decodeURIComponent(match.params.repository);
  
    // fazer as duas chamadas serem executas ao mesmo tempo
    // issues: comentarios do GitHub
    const [ repository, issues ] = await Promise.all([ 
      api.get(`/repos/${repositoryName}`),
      api.get(`/repos/${repositoryName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        }
      }),
    ]);

     this.setState({ 
       repository: repository.date,
       issues: issues.data,
       loading: false,
      });
   }

    render() {
      const { repository, issues, loading } = this.state;

      return <h1> Repository </h1>
    }
}
