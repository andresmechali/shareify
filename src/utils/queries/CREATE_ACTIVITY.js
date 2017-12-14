import gql from 'graphql-tag';

const CREATE_ACTIVITY = gql`
    mutation createActivity(
        $type: String!
        $user: String!
        $activityId: String!
        $viewed: Boolean!
        $date: String!
        $item: String
        $review: String
        $message: String
    ) 
    {
        createActivity(
            type: $type
            user: $user
            activityId: $activityId
            viewed: $viewed
            date: $date
            item: $item
            review: $review
            message: $message
        )
    }
`;

export default CREATE_ACTIVITY;