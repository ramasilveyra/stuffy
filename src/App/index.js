import gitHub from '../dispatchers/github';
// import { lambie } from '../../lib';
import createRepos from '../Repos';
import createSearch from '../Search';

export default (React, stuffy) => {
  const gh = gitHub(stuffy);
  const Repos  = stuffy.compose(gh.events.loaded)(createRepos(React));
  const Search = stuffy.compose()(createSearch(React, gh));

  const App = () => <div>
    <h1>Stuffy</h1>

    <Search />
    <Repos />
  </div>;

  return App;
};
