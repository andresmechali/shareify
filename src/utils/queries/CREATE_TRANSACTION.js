import gql from 'graphql-tag';

const CREATE_TRANSACTION = gql`
    mutation createTransaction(
        $item: String!
        $user: String!
        $userFrom: String!
        $userTo: String!
        $dateCreated: String!
        $active: String!
        $dateFinished: String!
        $request: String!
    ) 
    {
        createTransaction(
            item: $item
            user: $user
            userFrom: $userFrom
            userTo: $userTo
            dateCreated: $dateCreated
            active: $active 
            dateFinished: $dateFinished
            request: $request
        )
        {
            token
            user {
                _id
                transactions {
                    _id
                }
            }
        }
    }
`;

export default CREATE_TRANSACTION;