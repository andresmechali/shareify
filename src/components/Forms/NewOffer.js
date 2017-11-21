import React from 'react';
import PropTypes from 'prop-types';

import validateInput from '../../utils/formValidation';
import Input from '../../components/Inputs/Input';

import OfferPreview from '../../components/Preview/OfferPreview';
import PlacesSearchBox from '../../components/Maps/PlacesSearchBox';

class NewOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: "",
            location: "",
            latitude: 55.6760968,
            longitude: 12.568337199999974,
            description: "",
            isLoading: false,
            errors: {},
            focus: "",
            flashMessage: "",
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

    toggleRemember() {
        this.setState({
            remember: !this.state.remember
        })
    }

    isValid() {
        const { errors, isValid} = validateInput({
            item: this.state.item,
            location: this.state.location,
            description: this.state.description,
        });

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();

        console.log('asdsad')

        this.props.deleteFlashMessage();

        if (this.isValid()) {
            this.setState({
                isLoading: true,
            });
            this.props.mutate({
                variables: {
                    item: this.state.item,
                    location: this.state.location,
                    description: this.state.description,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                }
            })
                .then(({data}) => {
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
                                        <Input name='item'
                                               label= 'What do you want to offer?'
                                               type='text'
                                               errors={this.state.errors}
                                               focus={this.state.focus}
                                               value={this.state.item}
                                               onChange={this.onChange}
                                               onFocus={this.onFocus}
                                               onBlur={this.onBlur}
                                               autoFocus={true}
                                               placeholder="What do you want to offer?"
                                        />
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                        <div className="form-group label-floating">
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
                                            />
                                        </div>
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
                                </div>
                                <button type="submit"></button>
                            </form>
                        </div>
                    </div>
                </div>
                <OfferPreview
                    item={this.state.item}
                    quantity={this.state.quantity}
                    description={this.state.description}
                    location={this.state.location}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    radiusOfSearch={15}
                />
            </div>
        )
    }
}

NewOffer.propTypes = {
    push: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired,
};

export default NewOffer;