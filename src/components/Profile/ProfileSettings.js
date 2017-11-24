import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

import validateInput from '../../utils/formValidation';

import Input from '../../components/Inputs/Input';
import Select from '../../components/Inputs/Select';

import FlashMessageList from '../../components/FlashMessages/FlashMessageList';

const profileSettings = ['dateOfBirth', 'countryOfBirth', 'countryOfResidence', 'cityOfResidence', 'postalCode',
    'gender', 'phoneCode', 'phoneNumber', 'address', 'apartment', 'description'];

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.user,
            errors: {},
            focus: '',
            isLoading: false,
            defaultSettings: props.user,
            hasChanges: false
        };
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRestore = this.onRestore.bind(this);
        this.omit = ['username', 'email', 'firstName', 'lastName', 'password', 'iat', 'picturePath', 'status', 'errors', 'focus', 'isLoading', 'defaultSettings', 'hasChanges']

    }

    componentWillMount() {
        profileSettings.map((setting) => {
            if (!this.state.defaultSettings[setting]) {
                this.setState({
                    [setting]: ''
                })
            }
            return null
        })
    }

    onChange(e) {
        this.setState({
            hasChanges: true,
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

    onRestore(e) {
        e.preventDefault();
        profileSettings.map((setting) => {
            if (this.state.defaultSettings[setting]) {
                this.setState({
                    [setting]: this.state.defaultSettings[setting]
                })
            }
            else {
                this.setState({
                    [setting]: ''
                })
            }
            return null
        })
    }

    isValid() {
        const { errors, isValid} = validateInput(_.omit({
            ...this.state
        }, this.omit), true);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.deleteFlashMessage();

        this.setState({
            isLoading: true,
            hasChanges: false,
        });
        if (this.isValid()) {
            this.props.mutate({
                variables: _.omit({
                    ...this.state
                }, this.omit)
            })
                .then(({data}) =>{
                    this.props.setCurrentUser(jwt.decode(data.updateUser.token));
                    if (window.sessionStorage.getItem('token')) {
                        window.sessionStorage.setItem('token', data.updateUser.token)
                    }
                    if (window.localStorage.getItem('token')) {
                        window.localStorage.setItem('token', data.updateUser.token)
                    }
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You have updated your settings successfully!'
                    });
                    this.props.push('/profile/settings');
                })
                .catch((error) => {
                    this.props.addFlashMessage({
                        type: 'error',
                        text: error.message
                    });
                    this.setState({isLoading: false})

                });
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
                    Profile settings
                </div>
                <div className="ui-block-content">
                    <form onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Input name='firstName'
                                       label= 'First name'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.firstName}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                       autoFocus={true}
                                       disabled={true}
                                />
                                <Input name='username'
                                       label= 'Username'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.username}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                       disabled={true}
                                />
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Input name='lastName'
                                       label= 'Last name'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.lastName}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                       disabled={true}
                                />
                                <Input name='email'
                                       label= 'Email'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.email}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                       disabled={true}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Input name='dateOfBirth'
                                       label= 'Birth (DD-MM-YYYY)'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.dateOfBirth}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Input name='countryOfBirth'
                                       label= 'Country of birth'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.countryOfBirth}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Input name='phoneCode'
                                       label= 'Phone code'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.phoneCode}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Input name='phoneNumber'
                                       label= 'Phone number'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.phoneNumber}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Input name='countryOfResidence'
                                       label= 'Country of residence'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.countryOfResidence}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Input name='cityOfResidence'
                                       label= 'City of residence'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.cityOfResidence}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Input name='address'
                                       label= 'Address'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.address}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Input name='apartment'
                                       label= 'Apartment'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.apartment}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Input name='postalCode'
                                       label= 'Postal code'
                                       type='text'
                                       errors={this.state.errors}
                                       focus={this.state.focus}
                                       value={this.state.postalCode}
                                       onChange={this.onChange}
                                       onFocus={this.onFocus}
                                       onBlur={this.onBlur}
                                />
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <Select name="gender"
                                        label="Gender"
                                        onChange={this.onChange}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                        options={["", "Male", "Female", "LGBT"]}
                                        defaultValue={this.state.gender}
                                />
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group label-floating">
                                    <label className="control-label">Description</label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        value={this.state.description}
                                        onChange={this.onChange}
                                        onFocus={this.onFocus}
                                        onBlur={this.onBlur}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <div onClick={this.onRestore}
                                            className="btn btn-reset btn-lg-2 full-width"
                                    >
                                        Restore values
                                        <div className="ripple-container" />
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="form-group">
                                    <button onClick={this.onSubmit}
                                            className="btn btn-submit btn-lg-2 full-width"
                                            disabled={this.state.isLoading || !this.state.hasChanges}
                                    >
                                        Save changes
                                        <div className="ripple-container" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {this.props.flashMessages?
                            <FlashMessageList messages={this.props.flashMessages}/> : ''
                        }
                    </form>
                </div>
            </div>
        )
    }
}

const updateUser = gql`
    mutation updateUser(
        $_id: String
        $dateOfBirth: String
        $countryOfBirth: String
        $countryOfResidence: String
        $cityOfResidence: String
        $postalCode: String
        $gender: String
        $phoneCode: String
        $phoneNumber: String
        $address: String
        $apartment: String
        $description: String
    ) {
        updateUser(
            _id: $_id
            dateOfBirth: $dateOfBirth
            countryOfBirth: $countryOfBirth
            countryOfResidence: $countryOfResidence
            cityOfResidence: $cityOfResidence
            postalCode: $postalCode
            gender: $gender
            phoneCode: $phoneCode
            phoneNumber: $phoneNumber
            address: $address
            apartment: $apartment
            description: $description
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
                status
                dateOfBirth
                countryOfBirth
                countryOfResidence
                cityOfResidence
                postalCode
                gender
                phoneCode
                phoneNumber
                address
                apartment
                description
            }
        }
    }
`;

Profile.propTypes = {
    push: PropTypes.func.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
    flashMessages: PropTypes.array.isRequired,
};

Profile = graphql(updateUser)(Profile);

export default Profile;