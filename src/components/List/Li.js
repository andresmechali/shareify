import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Li = (props) => {
  return (
      <li>
          <Link to={props.link} className={props.className}>
              {props.text}
          </Link>
      </li>
  )
};

Li.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};

export default Li

