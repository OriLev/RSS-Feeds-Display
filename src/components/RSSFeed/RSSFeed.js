import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Loading, } from '../Loading/Loading';
import { ErrorMessage, } from '../ErrorMessage/ErrorMessage';
import { ItemsList, } from '../ItemsList/ItemsList';
import './RSSFeed.css';

function Item({ pubDate, title, content, }) {
  return (
    <div className="itemBox">
      <h5 className="itemBox__date"> {pubDate} </h5>
      <h3> { title } </h3>
      <p  className="itemBox__content" dangerouslySetInnerHTML={{__html: content }}/>
    </div>
  )
}

Item.propTypes = {
  pubDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
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
        const error = new Error(response.statusText)
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
        error: 'error: ' + ( err.message || err.response.message ),
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
    const FeedItems = items.map(item => {
      const { pubDate, title, content, } = item;
      const itemProps = { pubDate, title, content, };
      return <Item { ...itemProps } />
    })
    const keys = items.map(item => item.guid);
    return <ItemsList type="autoSize" items={ FeedItems } keys={ keys } />;
  }
}

RSSFeed.propTypes = {
  activeFeed: PropTypes.string.isRequired,
}
