import gql from 'graphql-tag';

const CHANGE_USER_PICTURE = gql`
    mutation changeUserPicture(
        $userId: String!
        $picturePath: String!
    ) {
        changeUserPicture(
            userId: $userId
            picturePath: $picturePath
        )
        {
            token
            user {
                _id
            }
        }
    }
`;

export default CHANGE_USER_PICTURE;