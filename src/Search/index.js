export default (React, { stuffy, events }) => {
  const Search = () => {
    const onChange = (e) => {
      stuffy.broadcast(events.search, e.target.value);
    };

    return (
      <div>
        <label>Username: </label>
        <input onChange={onChange} type="text"></input>
      </div>
    );
  };

  return Search;
};
