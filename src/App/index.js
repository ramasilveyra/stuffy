import gitHub from '../dispatchers/github';
import createRepos from '../Repos';
import createSearch from '../Search';
import createUserInfo from '../UserInfo';

export default (React, stuffy) => {
  const dispatcher = gitHub(stuffy);

  const Search   = stuffy.compose(createSearch(React, dispatcher));
  const Repos    = stuffy.compose(createRepos(React), {
    event: dispatcher.events.loaded,
    transformer: () => ({
      pick: ['name', 'description', 'language'],
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

  const App = () => (
    <div className="container">
      <section className="content-page current">
        <div className="row">
          <div className="col-xs-12 content-header">
            <h1 className="pull-left">Stuffy</h1>
          </div>
        </div>

        <UserInfo />
        <Search />
        <Repos />
      </section>
    </div>
  );

  return App;
};
