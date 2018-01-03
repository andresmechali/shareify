import gql from 'graphql-tag';

const REVIEW_QUERY = gql`
    query reviewByTransactionAndUserFrom($transaction: String!, $userFrom: String!) {
        reviewByTransactionAndUserFrom(transaction: $transaction, userFrom: $userFrom) {
            _id
            userFrom {
                _id
            }
            userTo {
                _id
            }
            date
            rate
            comment
        }
    }
`;

export default REVIEW_QUERY;