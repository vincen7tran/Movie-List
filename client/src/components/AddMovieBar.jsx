import React from 'react';

class AddMovieBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { input: '' };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.input);
    this.setState( {input: '' });
  }

  render() {
    return (
      <form className="movie-form" onSubmit={this.handleSubmit}>
      <input type="text" onChange={e => this.setState({ input: e.target.value })} value={this.state.input} placeholder="Add Movie Title" />
      <input type="submit" value="Add Movie"/>
      </form>
    );
  }
}

export default AddMovieBar;