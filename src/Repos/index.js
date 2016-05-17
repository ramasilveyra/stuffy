import { map } from 'lodash';

export default (React) => {
  const Repos = (props) => {
    const repos = map(props.repos, (repo, idx) => (
      <ul key={idx}>{repo.name}</ul>
    ));

    return (
      <ul>
        { repos }
      </ul>
    );
  };

  Repos.propTypes = {
    repos: React.PropTypes.array
  };

  return Repos;
};
