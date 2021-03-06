const service = require('../services/posts');

//GET
function getAll(req, res, next) {
    service.getAll()
        .then(res => res.map(p => p.viewNested()))
        .then(data => res.json(data))
        .catch(next);
}
//GET
function getById(req, res, next) {
    const { id } = req.params;
    service.getById(id)
        .then(res => res.view())
        .then(data => res.json(data))
        .catch(next);
}
//POST
function create(req, res, next) {
    const data = req.body;
    data.createdOn = new Date();
    service.create(data)
        .then(res => res.view())
        .then((data) => res.json(data))
        .catch(next);
}
//PATCH
function update(req, res, next) {
    const data = req.body;
    service.update(data)
        .then(res => res.viewNested())
        .then((data) => res.json(data))
        .catch(next);
}
//DELETE
function remove(req, res, next) {
    const { id } = req.params;
    service.remove(id)
        .then((data) => res.json(data))
        .catch(next);
}
//POST
function reaction(req, res, next) {
    const data = req.body;
    service.reaction(data)
        .then(res => {
            if (typeof res !== 'string') {
                return res.view();
            }
            return res;
        })
        .then(data => res.json(data))
        .catch(next);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    reaction,
}