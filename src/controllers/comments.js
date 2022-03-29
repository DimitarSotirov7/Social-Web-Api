const service = require('../services/comments');

//GET
function getById(req, res, next) {
    const { id } = req.params;
    service.getById(id)
        .then(res => res.view())
        .then(data => {
            return res.json(data);
        })
        .catch(next);
}
//POST
function create(req, res, next) {
    const data = req.body;
    data.createdOn = new Date();
    service.create(data)
        .then(res => res.view())
        .then((data) => {
            return res.json(data) //TODO: for test purposes
        })
        .catch(next);
}
//POST
function update(req, res, next) {
    const { id } = req.params;
    const data = req.body;
    service.update(id, data)
        .then(res => res.view())
        .then((data) => {
            return res.json(data) //TODO: for test purposes
        })
        .catch(next);
}
//GET
function remove(req, res, next) {
    const { id } = req.params;
    service.remove(id)
        .then(res => res.view())
        .then((data) => {
            return res.json(data) //TODO: for test purposes
        })
        .catch(next);
}
//GET
function getAllByPostId(req, res, next) {
    const { id } = req.params;
    service.getAllByPostId(id)
        .then(res => res.map(r => r.view()))
        .then(data => {
            return res.json(data);
        })
        .catch(next);
}
//GET
function like(req, res, next) {
    const { id } = req.params;
    service.like(id)
        .then(res => res.map(r => r.view()))
        .then(data => {
            return res.json(data);
        })
        .catch(next);
}
//GET
function dislike(req, res, next) {
    const { id } = req.params;
    service.dislike(id)
        .then(res => res.map(r => r.view()))
        .then(data => {
            return res.json(data);
        })
        .catch(next);
}

module.exports = {
    create,
    update,
    remove,
    getById,
    getAllByPostId,
    like,
    dislike,
}