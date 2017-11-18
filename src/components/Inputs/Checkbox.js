import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  return (
      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="">
              <div className="togglebutton">
                  <label>
                      <input type="checkbox" value='asd' checked={props.checked} />
                      <span onClick={props.onToggle} className="toggle" />
                      <span className="toggle-description">
                          {props.text}
                      </span>
                  </label>
              </div>
          </div>
      </div>
  )
};

Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
};

export default Checkbox;