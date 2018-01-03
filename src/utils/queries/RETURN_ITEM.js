import gql from 'graphql-tag';

const RETURN_ITEM = gql`
    mutation returnItem(
        $transaction: String!
        $item: String!
        $date: String!
        $user: String!
        $userFrom: String!
        $userTo: String!
        $comment: String!
        $rate: Int!
    ) 
    {
        returnItem(
            transaction: $transaction
            item: $item
            date: $date
            user: $user
            userFrom: $userFrom
            userTo: $userTo
            comment: $comment
            rate: $rate
        )
        {
            token
            user {
                _id
            }
        }
    }
`;

export default RETURN_ITEM;