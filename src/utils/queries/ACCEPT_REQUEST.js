import gql from 'graphql-tag';

const ACCEPT_REQUEST = gql`
    mutation acceptRequest(
        $_id: String!
        $item: String!
        $date: String!
        $user: String!
        $userFrom: String!
        $userTo: String!
        $message: String!
    ) 
    {
        acceptRequest(
            _id: $_id
            item: $item
            date: $date
            user: $user
            userFrom: $userFrom
            userTo: $userTo
            message: $message
        )
    }
`;

export default ACCEPT_REQUEST;