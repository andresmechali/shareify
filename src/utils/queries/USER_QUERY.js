import gql from 'graphql-tag';

const USER_QUERY = gql`
    query userById($_id: String!) {
        userById(_id: $_id) {
            _id
            firstName
            lastName
            email
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
        }
    }
`;

export default USER_QUERY;