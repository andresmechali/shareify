import gql from 'graphql-tag';

const LAST_OFFERED = gql`
    query lastOffers($_id: String!) {
        lastOffers(_id: $_id) {
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
            user {
                _id
                firstName
                lastName
                username
                picturePath
            }
        }
    }
`;

export default LAST_OFFERED;