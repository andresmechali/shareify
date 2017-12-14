import gql from 'graphql-tag';

const CREATE_CONVERSATION = gql`
    mutation createConversation(
        $item: String!
        $userFrom: String!
        $userTo: String!
        $messages: [String!]
    ) 
    {
        createConversation(
            item: $item
            userFrom: $userFrom
            userTo: $userTo
            messages: $messages
        )
    }
`;

export default CREATE_CONVERSATION;