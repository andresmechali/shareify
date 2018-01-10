import gql from 'graphql-tag';

const ACTIVATE_ITEM = gql`
    mutation activateItem(
        $_id: String!
        $date: String!
    ) {
        activateItem(
            _id: $_id
            date: $date
        )
    }
`;

export default ACTIVATE_ITEM;