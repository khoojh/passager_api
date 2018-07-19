module.exports = () => {
    return (err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send('Invalid token');
            return;
        }
        console.log(err.message);
        res.status(500).send(err);
    };
};
