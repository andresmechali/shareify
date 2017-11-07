import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            repeatPassword: "",

        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.userSignupRequest(this.state);
    }

    render() {
        return(
            <div className="show">
                <div className="modal-dialog ui-block window-popup register-popup">
                    <div className="ui-block-title">
                        <h6 className="title bold">Register new user</h6>
                    </div>
                    <div className="ui-block-content">
                        <form onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div className="form-group label-floating">
                                        <label className="control-label">First Name</label>
                                        <input name="firstName" onChange={this.onChange} className="form-control taller-input" placeholder="" type="text" value={this.state.firstName} />
                                        <span className="material-input" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div className="form-group label-floating">
                                        <label className="control-label">Last Name</label>
                                        <input name="lastName" onChange={this.onChange} className="form-control taller-input" placeholder="" type="text" value={this.state.lastName} />
                                        <span className="material-input" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div className="form-group label-floating">
                                        <label className="control-label">Email</label>
                                        <input name="email" onChange={this.onChange} className="form-control taller-input" placeholder="" type="text" value={this.state.email} />
                                        <span className="material-input" />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <div className="form-group label-floating">
                                        <label className="control-label">Username</label>
                                        <input name="username" onChange={this.onChange} className="form-control taller-input" placeholder="" type="text" value={this.state.username} />
                                        <span className="material-input" />
                                    </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="form-group label-floating">
                                        <label className="control-label">Password</label>
                                        <input name="password" onChange={this.onChange} className="form-control taller-input" placeholder="" type="password" value={this.state.password} />
                                        <span className="material-input" />
                                    </div>
                                    <div className="form-group label-floating">
                                        <label className="control-label">Repeat password</label>
                                        <input name="repeatPassword" onChange={this.onChange} className="form-control taller-input" placeholder="" type="password" value={this.state.repeatPassword} />
                                        <span className="material-input" />
                                    </div>
                                    <button className="btn btn-primary btn-lg full-width taller-input">
                                        Sign up
                                        <div className="ripple-container" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default SignupForm;