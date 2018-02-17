import React from 'react';
import PropTypes from 'prop-types';
import './ItemsList.css';

export function ItemsList({ items, type, keys }) {
  function getItemClassModifier() {
    if (type === 'oneSize') {
      return 'itemsList__Item--oneSize';
    }
    if (type === 'autoSize') {
      return 'itemsList__Item--autoSize';
    }
    const err = new Error('type value not allowed');
    throw err;
  }
  const itemsClassName = 'itemsList__Item ' + getItemClassModifier();
  const ListItems = items.map((item, index) => (
    <li key={ keys[index] } className= { itemsClassName } >
      { item }
    </li>
  ))
  return (
    <ul className="itemsList">
      { ListItems }
    </ul>
  );
}

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
  type: PropTypes.string.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
}