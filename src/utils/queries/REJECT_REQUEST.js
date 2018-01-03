import gql from 'graphql-tag';

const REJECT_REQUEST = gql`
    mutation rejectRequest(
        $_id: String!
        $item: String!
        $date: String!
        $user: String!
        $userFrom: String!
        $userTo: String!
        $message: String!
    ) 
    {
        rejectRequest(
            _id: $_id
            item: $item
            date: $date
            user: $user
            userFrom: $userFrom
            userTo: $userTo
            message: $message
        )
        {
            token
            user {
                _id
            }
        }
    }
`;

export default REJECT_REQUEST;