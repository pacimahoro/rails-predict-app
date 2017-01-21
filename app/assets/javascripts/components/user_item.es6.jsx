class UserItem extends React.Component {
  render () {
    return (
      <div>
        <div>Name: {this.props.name}</div>
        <div>Height: {this.props.height}</div>
        <div>Weight: {this.props.weight}</div>
      </div>
    );
  }
}

UserItem.propTypes = {
  name: React.PropTypes.string,
  height: React.PropTypes.number,
  weight: React.PropTypes.number
};
