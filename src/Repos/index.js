import { assign } from 'lodash';

export default (React) => (props) => {
  const renderRepos = (repos) => repos.map((repo, idx) => (
    <ul key={idx}>{repo.name}</ul>
  ));

  const { repos } = defaults(props);

  return <ul>{renderRepos(repos)}</ul>;
};

const defaults = (props) => assign({}, props, {
  repos: props.repos || []
});
