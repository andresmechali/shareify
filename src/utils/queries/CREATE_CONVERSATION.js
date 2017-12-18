import gql from 'graphql-tag';

const CREATE_CONVERSATION = gql`
    mutation createConversation(
        $item: String!
        $userFrom: String!
        $userTo: String!
        $messages: [String!]
        $lastDate: String!
    ) 
    {
        createConversation(
            item: $item
            userFrom: $userFrom
            userTo: $userTo
            messages: $messages
            lastDate: $lastDate
        )
    }
`;

export default CREATE_CONVERSATION;