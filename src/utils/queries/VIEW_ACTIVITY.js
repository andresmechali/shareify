import gql from 'graphql-tag';

const VIEW_ACTIVITY = gql`
    mutation viewActivity(
        $activityId: [String!]     
    ) {
        viewActivity(
            activityId: $activityId
        )
    }
`;

export default VIEW_ACTIVITY;