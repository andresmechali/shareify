import { MESSAGE, REQUEST } from '../utils/activityTypes';

const createNotificationList = user => {
    let notificationList = [];

    // Messages
    let conversationList = {};
    user.conversations.forEach(conversation => {
        conversationList[conversation._id] = {
            type: MESSAGE,
            conversation: conversation._id,
            unread: 0,
            date: conversation.lastDate,
            item: conversation.item
        };
        if (conversation.userFrom._id !== user._id) {
            conversationList[conversation._id].userOther = conversation.userFrom
        }
        else {
            conversationList[conversation._id].userOther = conversation.userTo
        }
        conversation.messages.forEach(message => {
            if (message.userFrom._id !== user._id && !message.read) {
                conversationList[conversation._id].unread ++;
            }
        })
    });

    Object.keys(conversationList).forEach(key => {
        if (conversationList[key].unread > 0) {
            notificationList.push(conversationList[key])
        }
    });


    // Requests
    let requestList = {};

    user.requests.forEach(request => {
        if (request.userTo._id === user._id && request.active) {
            requestList[request._id] = {
                type: REQUEST,
                request: request._id,
                userFrom: request.userFrom,
                date: request.date,
                item: request.item,
                viewed: request.viewed,
            };
        }
    });

    Object.keys(requestList).forEach(key => {
        if (requestList[key].viewed === false) {
            notificationList.push(requestList[key])
        }
    });

    // RETURN

    notificationList.sort(
        function(a, b) {
            if (a.date > b.date) return -1;
            if (a.date < b.date) return 1;
            return 0;
        }
    );

    return notificationList;
};

export default createNotificationList;