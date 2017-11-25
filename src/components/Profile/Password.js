import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import validateInput from '../../utils/formValidation';
import parseGraphQLError from '../../utils/parseGraphQLError';

import FlashMessageList from '../../components/FlashMessages/FlashMessageList';

import Input from '../../components/Inputs/Input';

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            currentPassword: "",
            password: "",
            repeatPassword: "",
            focus: "",
            errors: {},
            isLoading: false,
            hasChanges: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            hasChanges: true,
            errors: {...this.state.errors, [e.target.name]: ""},
            [e.target.name]: e.target.value,
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
                currentPassword: this.state.currentPassword,
                password: this.state.password,
                repeatPassword: this.state.repeatPassword,
        });

        if (!isValid) {
            console.log("is not valid");
            this.setState({ errors });
        }

        return isValid
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.deleteFlashMessage();
        this.setState({
            isLoading: true,
            hasChanges: false,
        });
        this.setState({asd:'asddsa'},
            function () {
                console.log(this.state);
            });
        if (this.isValid()) {
            this.props.mutate({
                variables: {
                    _id: this.state.user._id,
                    currentPassword: this.state.currentPassword,
                    password: this.state.password,
                    repeatPassword: this.state.repeatPassword,
                }
            }).then(
                (data) => {
                    console.log(data);
                }
            ).catch(
                (error) => {
                    this.props.addFlashMessage({
                        type: 'error',
                        text: parseGraphQLError(error.message)
                    });
                }
            )
        }
        else {
            this.setState({
                isLoading: false
            });
        }

    }

    render() {
        return (
            <div className="ui-block">
                <div className="ui-block-title">
                    <h6 className="title bold">
                        Change password
                    </h6>
                </div>
                <div className="ui-block-content">
                    <form>
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Input name='currentPassword'
                                       label= 'Current password'
                                       type='password'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.currentPassword}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Input name='password'
                                       label= 'Your new password'
                                       type='password'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.password}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Input name='repeatPassword'
                                       label= 'Confirm new password'
                                       type='password'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.repeatPassword}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <button onClick={this.onSubmit}
                                        className="btn btn-change-password btn-lg full-width"
                                        disabled={this.state.isLoading || !this.state.hasChanges}
                                >
                                    Change password
                                </button>
                            </div>

                        </div>
                        {this.props.flashMessages?
                            <FlashMessageList messages={this.props.flashMessages}
                                              deleteFlashMessage={this.props.deleteFlashMessage}
                            /> : ''
                        }

                    </form>
                </div>

            </div>
        )
    }
}

Password.propTypes = {
    user: PropTypes.object.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired,
};

const changePassword = gql`
    mutation changePassword(
        $_id: String!
        $currentPassword: String!
        $password: String!
        $repeatPassword: String!
    ) {
        changePassword(
            _id: $_id
            currentPassword: $currentPassword
            password: $password
            repeatPassword: $repeatPassword
        ) {
            token
            user {
                _id
            }
        }
    }
`;

Password = graphql(changePassword)(Password);

export default Password;