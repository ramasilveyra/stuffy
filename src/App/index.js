import gitHub from '../dispatchers/github';
import createRepos from '../Repos';
import createSearch from '../Search';
import createUserInfo from '../UserInfo';

export default (React, stuffy) => {
  const dispatcher = gitHub(stuffy);

  const Search   = stuffy.compose(createSearch(React, dispatcher));
  const Repos    = stuffy.compose(createRepos(React), {
    event: dispatcher.events.loaded,
    transformer: (R) => ({
      pick: ['name'],
      wrapWith: 'repos'
    })
  });
  const UserInfo = stuffy.compose(createUserInfo(React), {
    event: dispatcher.events.loaded,
    transformer: (R) => ({
      rename: { login: 'username', avatar_url: 'avatar' },
      extract: state => (R.last(state).owner),
      pick: ['id', 'login', 'avatar_url']
    })
  });

  // PIPELINE
  //
  // 1. Resolve event
  // 2. Transform result
  // 3. Render component

  const App = () => <div>
    <h1>Stuffy</h1>

    <UserInfo />
    <Search />
    <Repos />
  </div>;

  return App;
};
