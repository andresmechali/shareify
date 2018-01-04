import { MESSAGE, ITEM, SIGNUP } from '../utils/activityTypes';
import {REQUEST, TRANSACTION} from "./activityTypes";

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

    // Requests
    user.requests.forEach(request => {
        activityList.push({
            type: REQUEST,
            request: request,
            userFrom: request.userFrom,
            userTo: request.userTo,
            item: request.item,
            date: request.date,
        })
    });

    // Transactions
    user.transactions.forEach(transaction => {
        activityList.push({
            type: TRANSACTION,
            transaction: transaction,
            item: transaction.item,
            date: transaction.dateCreated,
            dateFinished: transaction.dateFinished,
        })
    });

    // Reviews

    // Settings update

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