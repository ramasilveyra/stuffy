import gitHub from '../dispatchers/github';
import { lambie } from '../../lib';
import createRepos from '../Repos';
import createSearch from '../Search';

export default (React, stuffy) => {
  const gh = gitHub(stuffy);
  const Repos  = lambie(stuffy, gh.events.loaded)(createRepos(React));
  const Search = lambie()(createSearch(React, stuffy, gh.events));

  const App = () => <div>
    <h1>Stuffy</h1>

    <Search />
    <Repos />
  </div>;

  return App;
};
