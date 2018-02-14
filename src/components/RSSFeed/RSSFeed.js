import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Loading, } from '../Loading/Loading';
import { ErrorMessage, } from '../ErrorMessage/ErrorMessage';
import './RSSFeed.css';

function Item({ pubDate, title, content, }) {
  return (
    <li>
      <div>
        <h3> { `${title} - ${pubDate}`} </h3>
        <p  dangerouslySetInnerHTML={{__html: content }}/>
      </div>
    </li>
  )
}

Item.propTypes = {
  pubDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
}

function ItemsList({ items, }) {
  return (
    <ul className="feedItemsList">
      { items.map(item => {
          const { guid, pubDate, title, content, } = item;
          const itemProps = { key: guid, pubDate, title, content, };
          return <Item { ...itemProps } />
      })}
    </ul>
  )
}

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export class RSSFeed extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      items: [],
      error: '',
    }
  }

  componentDidMount() {
    function checkStatus(response) {
      if (response.status === "ok") {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }
    const { activeFeed, } = this.props;
    const jsonFeedAPI = 'https://api.rss2json.com/v1/api.json?rss_url=';
    fetch(jsonFeedAPI + activeFeed)
    .then(res => res.json())
    .then(res => checkStatus(res))
    .then(res => (
      this.setState({
        loading: false,
        items: res.items,
      })
    ))
    .catch(err => (
      this.setState({
        loading: false,
        error: 'error: ' + err.response.message,
      })
    ))
  }
  render() {
    const { loading, items, error, } = this.state;
    if (loading) {
      return <Loading />
    }
    if (error) {
      return <ErrorMessage message={ error } />
    }
    console.log(items)
    return <ItemsList items={ items } />;
  }
}

RSSFeed.propTypes = {
  activeFeed: PropTypes.string.isRequired,
}