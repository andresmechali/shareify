import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
//import { withApollo } from 'react-apollo';

import Input from '../Inputs/Input';
import Checkbox from '../Inputs/Checkbox';

import validateInput from '../../utils/formValidation';
import FlashMessageList from "../FlashMessages/FlashMessageList";

import jwt from 'jsonwebtoken';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameOrEmail: "",
            password: "",
            errors: {},
            focus: "",
            isLoading: false,
            remember: false
        };
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.toggleRemember = this.toggleRemember.bind(this);
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

    toggleRemember() {
        this.setState({
            remember: !this.state.remember
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

        this.props.flashMessages.map(message => this.props.deleteFlashMessage(message.id));

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
                this.props.setCurrentUser(jwt.decode(data.signinUser.token));
                if (this.state.remember) {
                    window.localStorage.setItem('token', data.signinUser.token)
                }
                else {
                    window.sessionStorage.setItem('token', data.signinUser.token)
                }
                this.setState({isLoading: false})
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
                                       value={this.state.usernameOrEmail}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                       autoFocus={true}
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

                                <Checkbox checked={this.state.remember}
                                          text='Remember me'
                                          onToggle={this.toggleRemember}
                                />

                            </div>

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

                            {this.props.flashMessages?
                                <FlashMessageList messages={this.props.flashMessages}/> : ''
                            }

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const login = gql`
    mutation signinUser(
        $usernameOrEmail: String!
        $password: String!
    ) {
        signinUser(
            usernameOrEmail: $usernameOrEmail
            password: $password
        )
        {
            token
            user {
                _id
                username
                email
                firstName
                lastName
                picturePath
             }
        }
    }
`;

/*LoginForm = graphql(login, {
    options: (ownProps) => ({
        variables: {
            usernameOrEmail: ownProps.usernameOrEmail,
            password: ownProps.password
        }
    })
})(LoginForm);*/

LoginForm.propTypes = {
    addFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired,
    push: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
};

LoginForm = graphql(login)(LoginForm);

export default LoginForm;