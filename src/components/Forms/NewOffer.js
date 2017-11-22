import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import classNames from 'classnames';

import validateInput from '../../utils/formValidation';
import Input from '../../components/Inputs/Input';

import OfferPreview from '../../components/Preview/OfferPreview';
import PlacesSearchBox from '../../components/Maps/PlacesSearchBox';

class NewOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            location: props.auth.user.lastLocation? props.auth.user.lastLocation : "",
            latitude: props.auth.user.lastLatitude? props.auth.user.lastLatitude : 55.6760968,
            longitude: props.auth.user.lastLongitude? props.auth.user.lastLongitude : 12.568337199999974,
            description: "",
            isLoading: false,
            errors: {},
            focus: "",
            flashMessage: "",
            validLocation: true
        };
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        if (e.target.name === 'location') {
            this.setState({
                validLocation: false,
            })
        }
        this.setState({
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

    toggleRemember() {
        this.setState({
            remember: !this.state.remember
        })
    }

    isValid() {
        let { errors, isValid} = validateInput({
            name: this.state.name,
            location: this.state.location,
            latitude: String(this.state.latitude),
            longitude: String(this.state.longitude),
            description: this.state.description,
        });

        if (!this.state.validLocation) {
            isValid = false
            errors['location'] = 'Invalid location'
        }

        if (!isValid) {
            this.setState({ errors });
        }

        console.log(errors)
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        this.props.deleteFlashMessage();

        if (this.isValid()) {
            this.setState({
                isLoading: true,
            });
            this.props.mutate({
                variables: {
                    name: this.state.name,
                    location: this.state.location,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    description: this.state.description,
                    userId: this.props.auth.user._id,
                }
            })
                .then(({data}) => {
                    console.log('data:');
                    console.log(data);
                    this.setState({isLoading: false});
                    //this.props.push('/');
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
        return (
            <div className="row">
                <div className="col-xl-8 order-xl-2 col-lg-8 order-lg-2 col-md-12 order-md-1 col-sm-12 col-xs-12">
                    <div className="ui-block">
                        <div className="ui-block-title">
                            <h5 className="bold">Offer something you are not using</h5>
                        </div>
                        <div className="ui-block-content">
                            <form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <Input name='name'
                                               label= 'What do you want to offer?'
                                               type='text'
                                               errors={this.state.errors}
                                               focus={this.state.focus}
                                               value={this.state.name}
                                               onChange={this.onChange}
                                               onFocus={this.onFocus}
                                               onBlur={this.onBlur}
                                               autoFocus={true}
                                               placeholder="What do you want to offer?"
                                        />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div className={classNames("form-group label-floating",
                                            {"has-error": this.state.errors['location']}
                                            )}
                                        >
                                            <PlacesSearchBox
                                                googleMapURL= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA8zfwWQ-K9UXLe64adjv_dn8ELzk6yLdA&libraries=geometry,drawing,places'
                                                loadingElement= '<div style={{ height: `100%` }} />'
                                                containerElement= '<div style={{ height: `400px` }} />'
                                                name='location'
                                                label= 'Where do you have it?'
                                                type='text'
                                                errors={this.state.errors}
                                                focus={this.state.focus}
                                                value={this.state.location}
                                                onChange={this.onChange}
                                                onFocus={this.onFocus}
                                                onBlur={this.onBlur}
                                                setState={this.setState.bind(this)}
                                                validLocation={this.state.validLocation}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className={classNames("form-group label-floating",
                                            {"has-error": this.state.errors['description']}
                                        )}
                                        >
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
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <OfferPreview
                    name={this.state.name}
                    description={this.state.description}
                    location={this.state.location}
                    latitude={Number(this.state.latitude)}
                    longitude={Number(this.state.longitude)}
                    radiusOfSearch={20}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

NewOffer.propTypes = {
    auth: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
};


const createItem = gql`
    mutation createItem(
        $name: String!
        $location: String!
        $latitude: Float!
        $longitude: Float!
        $description: String!
        $userId: String!
    ) {
        createItem(
            name: $name
            location: $location
            latitude: $latitude
            longitude: $longitude
            description: $description
            userId: $userId
        )
        {
            _id
            name
            location
            latitude
            longitude
            description
            user {
                _id
                firstName
                lastLocation
                lastLatitude
                lastLongitude
            }
        }
    }
`;

NewOffer = graphql(createItem)(NewOffer);

export default NewOffer;