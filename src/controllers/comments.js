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
    service.create(data)
        .then(res => res.view())
        .then((data) => {
            return res.json(data) //TODO: for test purposes
        })
        .catch(next);
}
//PATCH
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
//DELETE
function remove(req, res, next) {
    const { id } = req.params;
    service.remove(id)
        .then(res => res.view())
        .then((data) => {
            return res.json(data) //TODO: for test purposes
        })
        .catch(next);
}

module.exports = {
    create,
    update,
    remove,
    getById,
}