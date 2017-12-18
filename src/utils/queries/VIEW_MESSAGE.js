import gql from 'graphql-tag';

const VIEW_MESSAGE = gql`
    mutation viewMessage(
        $conversationId: String!
    ) {
        viewMessage(
            conversationId: $conversationId
        )
    }
`;

export default VIEW_MESSAGE;