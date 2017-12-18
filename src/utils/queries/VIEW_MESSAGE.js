import gql from 'graphql-tag';

const VIEW_MESSAGE = gql`
    mutation viewMessage(
        $conversationId: String!
        $userId: String!
        $userFrom: String!
    ) {
        viewMessage(
            conversationId: $conversationId
            userId: $userId
            userFrom: $userFrom
        )
    }
`;

export default VIEW_MESSAGE;