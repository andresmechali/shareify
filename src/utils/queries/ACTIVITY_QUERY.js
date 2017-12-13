import gql from 'graphql-tag';

const ACTIVITY_QUERY = gql`
    query activityByUserId($_id: String!) {
        activityByUserId(_id: $_id) {
            _id
            type
            date
            activityId
            viewed
            user {
                _id
                firstName
                lastName
                username
            }
            item {
                _id
                name
                created
                type
                user {
                    _id
                    firstName
                    lastName
                    username
                }
            }
        }
    }
`;

export default ACTIVITY_QUERY;