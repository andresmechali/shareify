import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Input from '../Inputs/Input';

import validateInput from '../../utils/formValidation';
import FlashMessageList from "../FlashMessages/FlashMessageList";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: "",
            password: "",
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
            usernameOrEmail: this.state.usernameOrEmail,
            password: this.state.password,
        });

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()) {
            this.setState({
                isLoading: true,
            });
            this.props.mutate({
                variables: {
                    usernameOrEmail: this.state.usernameOrEmail,
                    password: this.state.password
                }
            })
                .then(({data}) => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You have logged in successfully!'
                    });
                    this.props.push('/');
                })
                .catch((error) => {
                    this.props.addFlashMessage({
                        type: 'error',
                        text: error.message
                    });
                    this.setState({flashMessage: 'error', isLoading: false})

                });
        }
    }

    render() {
        return(
            <div className="show">
                <div className="modal-dialog ui-block window-popup register-popup">
                    <div className="ui-block-title">
                        <h6 className="title bold">Log in</h6>
                    </div>
                    <div className="ui-block-content">
                        <form onSubmit={this.onSubmit}>
                            <div className="row">

                                <Input className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                       name='usernameOrEmail'
                                       label= 'Username or Email'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.firstName}
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

                            </div>

                            {this.props.flashMessages?
                                <FlashMessageList messages={this.props.flashMessages}/> : ''
                            }

                            <button
                                className="btn btn-primary btn-lg full-width taller-input"
                                disabled={this.state.isLoading}
                            >
                                {!this.state.isLoading?
                                    "Log in"
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

const login = gql`
    query userByUsernameOrEmail(
        $usernameOrEmail: String!
        $password: String!
    ) {
        userByUsernameOrEmail(
            usernameOrEmail: $usernameOrEmail
            password: $password
        )
        {
            _id
            username
            email
            firstName
            lastName
        }
    }
`;

LoginForm = graphql(login)(LoginForm);

LoginForm.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired,
    push: PropTypes.func.isRequired
};

export default LoginForm;