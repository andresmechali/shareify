import gql from 'graphql-tag';

const ACTIVITY_QUERY = gql`
    query activities($_id: String!) {
        activityByUserIdItem(_id: $_id, type: "ITEM") {
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
        activityByUserIdMessage(_id: $_id, type: "MESSAGE") {
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

export default ACTIVITY_QUERY;