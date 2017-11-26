import gql from 'graphql-tag';

const ITEM_QUERY = gql`
    mutation createView(
        $user: String!
        $item: String!
        $date: String!        
    ) {
        createView(
            user: $user
            item: $item
            date: $date
        )
    }
`;

export default ITEM_QUERY;