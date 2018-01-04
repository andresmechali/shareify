import gql from 'graphql-tag';

const CREATE_MESSAGE = gql`
    mutation createMessage(
        $conversation: String!
        $userFrom: String!
        $userTo: String!
        $message: String!
        $date: String!
        $read: Boolean!
    ) 
    {
        createMessage(
            conversation: $conversation
            userFrom: $userFrom
            userTo: $userTo
            message: $message
            date: $date
            read: $read
        ) {
            token
            user {
                _id
            }
        }
    }
`;

export default CREATE_MESSAGE;