import * as Request from 'superagent';

export default (stuffy) => {
  // Define Events
  const events = {
    loaded: Symbol('loaded'),
    search: Symbol('search')
  };

  stuffy.registerFromObject(events);

  // Search
  stuffy.subscribe(events.search, (user) => {
    Request
      .get(`https://api.github.com/users/${user}/repos`)
      .end((err, res) => {
        if (err) {
          return;
        }

        stuffy.broadcast(events.loaded, res.body);
      });
  });

  return {
    events,
    stuffy
  };
};
