const errDbHandler = require('../common/errDbHandler');

async function createModel(className, params) {
    try {
        return await className.create(params);
    } catch (err) {
        console.log(errDbHandler(err));
    }
};

async function addRefToModel(model, ref) {
    const modelInstace = await model.name.findById(model.id)
    await createModel(ref.name, ref.params).then(x => Promise.all([
        modelInstace[model.prop].push(x),
        modelInstace.save()
    ]));
}

module.exports = {
    createModel,
    addRefToModel,
}