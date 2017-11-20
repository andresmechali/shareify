import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class FlashMessage extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        this.props.deleteFlashMessage();
    }

    render() {
        const {text, type} = this.props.message;
        return(
            <div>
                <div className={classnames('alert', {
                    "alert-success": type === 'success',
                    "alert-danger": type === 'error'
                })}>
                    <button type="button" onClick={this.onClick} className="close"><span>&times;</span></button>
                    {text}
                </div>

            </div>
        )
    }
}

FlashMessage.propTypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
};

export default FlashMessage;