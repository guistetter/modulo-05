import React, { Component } from 'react';
import Proptypes from 'prop-types';
import api from '../../services/api';
import { Loading } from './styles';
export default class Repository extends Component {
  static propTypes = {
    match: Proptypes.shape({
      params: Proptypes.shape({
        repository: Proptypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
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

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }
    return <h1>Repository: </h1>;
  }
}
