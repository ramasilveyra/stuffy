import { assign } from 'lodash';

export default (React) => (props) => {
  const { username, avatar } = defaults(props);

  return (
    <div style={{ float: 'right' }}>
      <span style={{ marginRight: '10px' }}>{username}</span>
      <img width="32" className="img-circle" src={avatar}></img>
    </div>
  );
};

const defaults = (props) => assign({}, props, {
  username: props.username,
  avatar:   props.avatar
});
