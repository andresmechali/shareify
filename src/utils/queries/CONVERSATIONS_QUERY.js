import gql from 'graphql-tag';

const CONVERSATIONS_QUERY = gql`
    query conversations($_id: String!) {
        conversationsByUserId(_id: $_id) {
            _id
            conversations {
                _id
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
                messages {
                    _id
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
                lastDate
            }
        }
    }
   
`;

export default CONVERSATIONS_QUERY;