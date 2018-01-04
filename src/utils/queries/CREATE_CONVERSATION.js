import gql from 'graphql-tag';

const CREATE_CONVERSATION = gql`
    mutation createConversation(
        $userFrom: String!
        $userTo: String!
        $messages: [String!]
        $lastDate: String!
    ) 
    {
        createConversation(
            userFrom: $userFrom
            userTo: $userTo
            messages: $messages
            lastDate: $lastDate
        )
    }
`;

export default CREATE_CONVERSATION;