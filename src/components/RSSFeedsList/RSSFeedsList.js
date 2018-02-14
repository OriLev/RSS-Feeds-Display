import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, } from 'react-router-dom'
import './RSSFeedsList.css';

function RSSFeedLink({ feedURL, removeFeed, }) {
  return (
    <li>
      <NavLink to={`/${feedURL}`} activeClassName="activeLink">
        {feedURL}
      </NavLink>
      <input type="button" value="X" onClick={ removeFeed }/> 
    </li>
  )
}

RSSFeedLink.propTypes = {
  feedURL: PropTypes.string.isRequired,
  removeFeed: PropTypes.func.isRequired,
}

export function RSSFeedsList({ feedsList, removeFeed, }) {
  return (
    <ul>
      {feedsList.map((feedURL, index) => (
        <RSSFeedLink key={ feedURL } feedURL={ feedURL } removeFeed={ () => removeFeed(index) } />
      ))}
    </ul>
  );
}

RSSFeedsList.propTypes = {
  feedsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeFeed: PropTypes.func.isRequired,
}