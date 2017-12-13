import gql from 'graphql-tag';

const LAST_REQUESTED = gql`
    query lastRequests($_id: String!) {
        lastRequests(_id: $_id) {
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

export default LAST_REQUESTED;