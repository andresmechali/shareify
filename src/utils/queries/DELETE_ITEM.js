import gql from 'graphql-tag';

const DELETE_ITEM = gql`
    mutation deleteItem(
        $_id: String!
        $date: String!
    ) {
        deleteItem(
            _id: $_id
            date: $date
        )
    }
`;

export default DELETE_ITEM;