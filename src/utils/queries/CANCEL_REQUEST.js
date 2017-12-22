import gql from 'graphql-tag';

const CANCEL_REQUEST = gql`
    mutation cancelRequest(
        $_id: String!
        $date: String!
        $userFrom: String!
        $userTo: String!
    ) 
    {
        cancelRequest(
            _id: $_id
            date: $date
            userFrom: $userFrom
            userTo: $userTo
        )
        {
            token
            user {
                _id
            }
        }
    }
`;

export default CANCEL_REQUEST;