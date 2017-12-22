import gql from 'graphql-tag';

const CREATE_USER = gql`
    mutation createUser(
        $username: String!
        $email: String!
        $firstName: String!
        $lastName: String!
        $password: String!
        $picturePath: String!
        $status: String!
        $offered: [String]
        $requested: [String]
        $registered: String!
        $lastConnection: String!
        $radiusOfSearch: Int!
        $isAdmin: Boolean!
        $isSuperAdmin: Boolean!
        $activity: [String!]
        $conversations: [String!]
        $reviews: [String!]
        $transactions: [String!]
        $requests: [String!]
    ) {
        createUser(
            username: $username
            email: $email
            firstName: $firstName
            lastName: $lastName
            password: $password
            picturePath: $picturePath
            status: $status
            offered: $offered
            requested: $requested
            registered: $registered
            lastConnection: $lastConnection
            radiusOfSearch: $radiusOfSearch
            isAdmin: $isAdmin
            isSuperAdmin: $isSuperAdmin
            activity: $activity
            conversations: $conversations
            reviews: $reviews
            transactions: $transactions
            requests: $requests
        )
        {
            token
            user {
                _id
                username
                email
                firstName
                lastName
                picturePath
                status
            }
        }
    }
`;

export default CREATE_USER;