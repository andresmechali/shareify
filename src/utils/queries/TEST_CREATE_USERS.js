import gql from 'graphql-tag';

const TEST_CREATE_USERS = gql`
    mutation testCreateUsers(
        $number: Int!
    ) 
    {
        testCreateUsers(
            number: $number
        )
    }
`;

export default TEST_CREATE_USERS;