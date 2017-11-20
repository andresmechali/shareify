import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
    render() {
        return (
            <div className="form-group label-floating is-select">
                <label className="control-label">{this.props.label}</label>
                <select name={this.props.name}
                        className="selectpicker form-control taller-input"
                        onChange={this.props.onChange}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        tabIndex="-98"
                        defaultValue={this.props.defaultValue}
                >
                    {this.props.options.map((o, index) => {
                        return <option key={index} value={o}>{o}</option>
                    })}
                </select>
            </div>
        )
    }
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.string,
};

export default Select;