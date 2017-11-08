import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { push } from 'react-router-redux';

import Input from '../Inputs/Input';

import validateInput from '../../utils/formValidation';

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
            errors: {},
            focus: "",
            isLoading: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            errors: {...this.state.errors, [e.target.name]: ""},
            [e.target.name]: e.target.value
        })
    }

    onFocus(e) {
        this.setState({
            focus: e.target.name
        })
    }

    onBlur(e) {
        this.setState({
            focus: ""
        })
    }

    isValid() {
        const { errors, isValid} = validateInput({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword
        });

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.isValid()) {
            this.setState({
                isLoading: true,
            });
            this.props.userSignupRequest({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                repeatPassword: this.state.repeatPassword
            })
                .then(
                    ({ data }) => this.props.dispatch(push('/')),
                )
                .catch(
                    ( data ) => this.setState({errors: data.response.data.errors, isLoading: false}),
                );
        }
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

                                <Input className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                                        name='firstName'
                                        label= 'First name'
                                        type='text'
                                        errors={this.state.errors}
                                        focus={this.state.focus}
                                        value={this.state.firstName}
                                        onChange={this.onChange}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                />

                                <Input className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                                       name='lastName'
                                       label= 'Last name'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.lastName}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />

                                <Input className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                                       name='email'
                                       label= 'Email'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.email}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />

                                <Input className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                                       name='username'
                                       label= 'Username'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.username}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />

                                <Input className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                       name='password'
                                       label= 'Password'
                                       type='password'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.password}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />

                                <Input className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                       name='repeatPassword'
                                       label= 'Repeat password'
                                       type='password'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.repeatPassword}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />

                            </div>

                            <button
                                className="btn btn-primary btn-lg full-width taller-input"
                                disabled={this.state.isLoading}
                            >
                                {!this.state.isLoading?
                                    "Sign up"
                                    :
                                    "Loading"
                                }
                                <div className="ripple-container" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        store: state
    }
};

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(SignupForm);