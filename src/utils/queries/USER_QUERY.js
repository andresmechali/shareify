import gql from 'graphql-tag';

const USER_QUERY = gql`
    query userById($_id: String!) {
        userById(_id: $_id) {
            _id
            firstName
            lastName
            offered {
                _id
                name
                location
                latitude
                longitude
                description
            }
        }
    }
`;

export default USER_QUERY;