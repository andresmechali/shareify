import gql from 'graphql-tag';

const CREATE_ITEM = gql`
    mutation createItem(
        $name: String!
        $location: String!
        $latitude: Float!
        $longitude: Float!
        $description: String!
        $picturePath: String!
        $userId: String!
        $created: String!
        $active: Boolean!
        $views: [String]!
        $viewCount: Int!
        $type: String!
    ) {
        createItem(
            name: $name
            location: $location
            latitude: $latitude
            longitude: $longitude
            description: $description
            picturePath: $picturePath
            userId: $userId
            created: $created
            active: $active
            views: $views
            viewCount: $viewCount
            type: $type
        )
        {
            token
            item {
                _id
                name
                location
                latitude
                longitude
                description
                picturePath
                type
                user {
                    _id
                }
                created
            }
        }
    }
`;

export default CREATE_ITEM;