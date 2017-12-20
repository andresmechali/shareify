import { MESSAGE, ITEM, SIGNUP } from '../utils/activityTypes';

const createActivityList = user => {
    let activityList = [];

    // Signup
    activityList.push({
        type: SIGNUP,
        date: user.registered,
    });

    // Messages
    user.conversations.forEach(conversation => {
        conversation.messages.forEach(message => {
            activityList.push({
                type: MESSAGE,
                message: message,
                own: message.userFrom._id === user._id,
                date: message.date,
            })
        });
    });

    // Items
    user.offered.forEach(item => {
        activityList.push({
            type: ITEM,
            item: item,
            offered: true,
            date: item.created,
        })
    });

    user.requested.forEach(item => {
        activityList.push({
            type: ITEM,
            item: item,
            offered: false,
            date: item.created,
        })
    });

    activityList.sort(
        function(a, b) {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0;
        }
    );

    return activityList;
};

export default createActivityList;