import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import './RSSInputForm.css';


export class RSSInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFeed: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ newFeed: e.target.value, })
  }

  handleSubmit(e) {
    const { newFeed, } = this.state;
    const { addFeed, history, } = this.props;
    addFeed(newFeed);
    history.push(`/${newFeed}`);
    e.preventDefault();
  }

  render() {
    const { handleSubmit, handleChange, } = this;
    const { newFeed, } = this.state;
    return (
      <form className="inputForm" onSubmit={ handleSubmit }>
        <input 
          className="inputForm__input"
          required
          type="url" 
          value={ newFeed } 
          onChange={ handleChange } 
          placeholder="What URL should I check?"
        />
        <button className="inputForm__submitButton" type="submit" >
          <i className="fas fa-search fa-2x"></i>
        </button>
      </form>
    );
  }
}

RSSInputForm.propTypes = {
  addFeed: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}