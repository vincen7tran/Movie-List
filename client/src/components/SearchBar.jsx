import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: ''};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSearch(this.state.query);
    this.setState({ query: '' });
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input type="text" name="query" value={this.state.query} placeholder="Search Movie..." onChange={(e) => this.setState({ query: e.target.value })} />
        <input type="submit" value="Submit"></input>
      </form>
    );
  }
}

export default SearchBar;