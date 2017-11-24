
const percentageCompleted = (user) => {
    const total = 29;
    let completed = 10;
    if (user.picturePath !== 'no-image.jpg') {
        completed = completed + 3
    }
    if (user.dateOfBirth) {
        completed++
    }
    if (user.countryOfBirth) {
        completed++
    }
    if (user.countryOfResidence) {
        completed++
    }
    if (user.cityOfResidence) {
        completed++
    }
    if (user.postalCode) {
        completed++
    }
    if (user.address) {
        completed++
    }
    if (user.phoneNumber) {
        completed = completed + 3
    }
    if (user.gender) {
        completed++
    }
    if (user.description) {
        completed = completed + 3
    }
    if (user.facebook) {
        completed = completed + 3
    }


    return (
        Math.floor(100 * completed / total)
    )
};

export default percentageCompleted;