
const filterActive = (list) => {
    let newList = [];
    list.forEach(item => {
        if (item.active === true) {
            newList.push(item)
        }
    });

    return newList
};

export default filterActive;