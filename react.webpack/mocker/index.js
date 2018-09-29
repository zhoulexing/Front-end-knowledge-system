module.exports = {
    [`GET /api/user`]: (req, res) => {
        return res.json({
            id: 1,
            username: 'kenny',
            sex: 6
        });
    }
}
console.log(__filename);