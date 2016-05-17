import { assign } from 'lodash';

export default (React) => (props) => {
  const renderRepos = (repos) => repos.map((repo, idx) => (
    <tr key={idx}>
      <td className="text-truncate">{repo.name}</td>
      <td className="text-truncate">{repo.language}</td>
      <td className="text-truncate">{repo.description}</td>
    </tr>
  ));

  const { repos } = defaults(props);

  return (
    <table className="table table-fixed">
      <thead>
        <tr>
          <th width="30%" data-column="name">Name</th>
          <th width="10%" data-column="lastLogin">language</th>
          <th width="60%" data-column="email">description</th>
        </tr>
      </thead>
      <tbody>
        {renderRepos(repos)}
      </tbody>
    </table>
  );
};

const defaults = (props) => assign({}, props, {
  repos: props.repos || []
});
