import gql from 'graphql-tag';

const ACTIVITY_QUERY_MESSAGE = gql`
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
            message {
                _id
                conversation {
                    _id
                }
                item {
                    _id
                    name
                }
                userFrom {
                    _id
                    firstName
                    lastName
                    username
                }
                userTo {
                    _id
                    firstName
                    lastName
                    username
                }
                message
                date
                read
            }
        }
    }
`;

export default ACTIVITY_QUERY_MESSAGE;