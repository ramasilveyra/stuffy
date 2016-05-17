import { assign } from 'lodash';

export default (React) => (props) => {
  const { username, avatar } = defaults(props);

  return (
    <div>
      <img width="32" className="img-circle" src={avatar}></img>
      <span>{username}</span>
    </div>
  );
};

const defaults = (props) => assign({}, props, {
  username: props.username,
  avatar:   props.avatar
});
