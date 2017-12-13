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
        )
    }
`;

export default CREATE_ACTIVITY;