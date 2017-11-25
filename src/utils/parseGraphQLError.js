
const parseGraphQLError = (error) => {
    return error.split(": ")[1]
};

export default parseGraphQLError;