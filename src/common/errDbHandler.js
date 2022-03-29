module.exports = function (err) {
    const type = err.message.split(' ')[0];
    const messages = err.message.replace(`${type} validation failed: `, '').split(', ');
    return messages.reduce((acc, curr) => {
        const pairs = curr.split(': ');
        acc[pairs[0]] = pairs[1];
        return acc;
    }, {});
};