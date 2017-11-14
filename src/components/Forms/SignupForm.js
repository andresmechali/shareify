import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Input from '../Inputs/Input';

import validateInput from '../../utils/formValidation';
import FlashMessageList from "../FlashMessages/FlashMessageList";

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

        if (this.isValid()) {
            this.setState({
                isLoading: true,
            });
            this.props.mutate({
                variables: {
                    username: this.state.username,
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    password: this.state.password
                }
            })
                .then(({data}) => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You have signed up successfully!'
                    });
                    console.log(this.props.push);
                    this.props.push('/');
                })
                .catch((error) => {
                    console.log(error)
                    this.props.addFlashMessage({
                        type: 'error',
                        text: error.message
                    });
                    this.setState({flashMessage: 'error', isLoading: false})

                });
        }
    }


/*


                .catch(
                    ( data ) => this.setState({errors: data.response.data.errors, isLoading: false}),
                );
        }
    }*/

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

                            {this.props.flashMessages?
                                <FlashMessageList messages={this.props.flashMessages}/> : ''
                            }

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

const createUser = gql`
    mutation createUser(
        $username: String!
        $email: String!
        $firstName: String!
        $lastName: String!
        $password: String!
    ) {
        createUser(
            username: $username
            email: $email
            firstName: $firstName
            lastName: $lastName
            password: $password
        )
        {
            _id
            username
            email
            firstName
            lastName
            address
        }
    }
`;

SignupForm = graphql(createUser)(SignupForm);

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired
};

export default SignupForm;