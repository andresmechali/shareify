import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class RowWithButton extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="ui-block">
                            <div className="ui-block-title row-with-button">
                                <div className="h5 title bold">{this.props.title}</div>
                                <div className="align-right">
                                    <button style={{backgroundColor:this.props.color, width:'160px'}} className="btn btn-md">
                                        <Link to={this.props.link} className="h4 bold white-button">{this.props.buttonText}</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

RowWithButton.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,

};

export default RowWithButton;