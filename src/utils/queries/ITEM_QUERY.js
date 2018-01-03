import gql from 'graphql-tag';

const ITEM_QUERY = gql`
    query itemById($_id: String!) {
        itemById(_id: $_id) {
            _id
            name
            location
            latitude
            longitude
            description
            picturePath
            created
            active
            viewCount
            requests {
                _id
                item {
                    _id
                }
                userFrom {
                    _id
                }
                userTo {
                    _id
                }
                date
                message
                active
                viewed
                
            }
            transactions {
                _id
                userFrom {
                    _id
                }
                userTo {
                    _id
                }
                active
            }
            user {
                _id
                firstName
                lastName
                username
                picturePath
                status
                dateOfBirth
                countryOfBirth
                countryOfResidence
                cityOfResidence
                postalCode
                address
                apartment
                phoneCode
                phoneNumber
                gender
                description
                allowsToReceiveRequests
                radiusOfSearch
                facebook
                instagram
                linkedIn
                twitter
                validPhone
                validEmail
                facebookFriends
                isAdmin
                isSuperAdmin
                registered
                lastConnection
                lastLocation
                lastLatitude
                lastLongitude
                offered {
                    _id
                    name
                    location
                    latitude
                    longitude
                    description
                    picturePath
                }
                requested {
                    _id
                    name
                    location
                    latitude
                    longitude
                    description
                    picturePath
                }
                requests {
                    _id
                    item {
                        _id
                    }
                    userFrom {
                        _id
                    }
                    userTo {
                        _id
                    }
                    date
                    message
                    active
                }
                transactions {
                    _id
                    userFrom {
                        _id
                    }
                    userTo {
                        _id
                    }
                    active
                    item {
                        _id
                    }
                }
            } 
        }
    }
`;

export default ITEM_QUERY;