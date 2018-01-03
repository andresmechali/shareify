import gql from 'graphql-tag';

const USER_QUERY = gql`
    query userById($_id: String!) {
        userById(_id: $_id) {
            _id
            firstName
            lastName
            email
            username
            picturePath
            status
            dateOfBirth
            countryOfBirth
            countryOfResidence
            cityOfResidence
            postalCode
            address
            apartment
            phoneCode
            phoneNumber
            gender
            description
            allowsToReceiveRequests
            radiusOfSearch
            facebook
            instagram
            linkedIn
            twitter
            validPhone
            validEmail
            facebookFriends
            isAdmin
            isSuperAdmin
            registered
            lastConnection
            lastLocation
            lastLatitude
            lastLongitude
            offered {
                _id
                name
                location
                latitude
                longitude
                description
                picturePath
                created
                user {
                    _id
                }
            }
            requested {
                _id
                name
                location
                latitude
                longitude
                description
                picturePath
                created
                user {
                    _id
                }
            }
            activity {
                _id
            }
            conversations {
                _id
                lastDate
                userFrom {
                    _id
                    firstName
                    lastName
                    username
                }
                userTo {
                    _id
                    firstName
                    lastName
                    username
                }
                messages {
                    _id
                    userFrom {
                        _id
                        firstName
                        lastName
                        username
                    }
                    userTo {
                        _id
                        firstName
                        lastName
                        username
                    }
                    conversation {
                        _id
                    }
                    item {
                        _id
                        name
                        user {
                            _id
                        }
                    }
                    date
                    read
                }
                item {
                    _id
                    name
                }
            }
            requests {
                _id
                item {
                    _id
                    name
                    description
                    picturePath
                    type
                    reviews {
                        _id
                        rate
                        comment
                    }
                    created
                    viewCount
                    type
                    location
                }
                userFrom {
                    _id
                    firstName
                    lastName
                    username
                    email
                    picturePath
                    description
                    lastConnection
                    reviews {
                        _id
                        rate
                        comment
                    }
                }
                userTo {
                    _id
                    firstName
                    lastName
                    username
                }
                date
                message
                active
                viewed
            }
            transactions {
                _id
                item {
                    _id
                    name
                    description
                    picturePath
                    type
                    reviews {
                        _id
                        rate
                        comment
                    }
                    created
                    viewCount
                    type
                    location
                }
                userFrom {
                    _id
                    firstName
                    lastName
                    username
                    email
                    picturePath
                    description
                    lastConnection
                    reviews {
                        _id
                        rate
                        comment
                        userFrom {
                            _id
                        }
                        userTo {
                            _id
                        }
                    }
                }
                userTo {
                    _id
                    firstName
                    lastName
                    username
                    email
                    picturePath
                    description
                    lastConnection
                    reviews {
                        _id
                        rate
                        comment
                        userFrom {
                            _id
                        }
                        userTo {
                            _id
                        }
                    }
                }
                dateCreated
                dateFinished
                active
                request {
                    _id
                    item {
                        _id
                        name
                        description
                        picturePath
                        type
                        reviews {
                            _id
                            rate
                            comment
                        }
                        created
                        viewCount
                        type
                        location
                    }
                    userFrom {
                        _id
                        firstName
                        lastName
                        username
                        email
                        picturePath
                        description
                        lastConnection
                        reviews {
                            _id
                            rate
                            comment
                        }
                    }
                    userTo {
                        _id
                        firstName
                        lastName
                        username
                    }
                    date
                    message
                    active
                    viewed
                    accepted
                }  
            }
            reviews {
                _id
                rate
                comment
                userFrom {
                    _id
                    firstName
                    lastName
                    username
                }
            }
        }
    }
`;

export default USER_QUERY;