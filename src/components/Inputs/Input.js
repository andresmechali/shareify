import React from 'react';
import PropType from 'prop-types';

import classNames from 'classnames';

const Input = (props) => {
    return(
        <div className={props.className}>
            <div className={classNames("form-group label-floating",
                {"has-error": props.errors[props.name],
                    "is-empty":(props.value === ""),
                    "is-focused": (props.focus === `${props.name}`)})}
            >
                <label className="control-label">{props.label}</label>
                <input
                    className="form-control taller-input"
                    name={props.name}
                    type={props.type}
                    placeholder={props.placeholder? props.placeholder : ""}
                    value={props.value? props.value : ''}
                    onChange={props.onChange? props.onChange : ''}
                    onFocus={props.onFocus? props.onFocus : ''}
                    onBlur={props.onBlur? props.onBlur : ''}
                    autoFocus={props.autoFocus}
                    disabled={props.disabled? props.disabled : false}
                />
                <span className="material-input" />
            </div>
        </div>
    )
};

Input.propTypes = {
    name: PropType.string.isRequired,
    label: PropType.string.isRequired,
    type: PropType.string.isRequired,
    errors: PropType.object.isRequired,
    focus: PropType.string.isRequired,
    value: PropType.string,
    placeholder: PropType.string,
    onChange: PropType.func,
    onFocus: PropType.func,
    onBlur: PropType.func,
};

export default Input;