import gql from 'graphql-tag';

const REQUEST_ITEM = gql`
    mutation createRequest(
        $item: String!
        $userFrom: String!
        $userTo: String!
        $message: String!
        $date: String!
        $active: Boolean!
        $viewed: Boolean!
        $accepted: Boolean!
        $responseDate: String!,
        $responseMessage: String!
    ) 
    {
        createRequest(
            item: $item
            userFrom: $userFrom
            userTo: $userTo
            message: $message
            date: $date
            active: $active
            viewed: $viewed
            accepted: $accepted
            responseDate: $responseDate
            responseMessage: $responseMessage
        )
        {
            token
            user {
                _id
                requests {
                    _id
                }
            }
        }
    }
`;

export default REQUEST_ITEM;