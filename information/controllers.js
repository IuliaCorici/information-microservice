const Router = require('express').Router();

const {
    ServerError
} = require('../errors');

const {
    getAll,
    getById,
    add,
    update,
    remove
} = require('./services.js');

Router.get('/:id_landmark', async (req, res) => {
    const {
        id_landmark
    } = req.params;

    const landmark = await getById(id_landmark);

    res.json(landmark);

});

Router.get('/', async (req, res) => {

    const landmarks = await getAll();

    res.json(landmarks);

});

Router.post('/', async (req, res) => {
    const {
        id_landmark,
        name_landmark,
        info,
        year_landmark
    } = req.body;

    if (typeof name_landmark !== 'string') {
        throw new ServerError('Nume invalid!', 400);
    }

    const id = await add(id_landmark, name_landmark, info, year_landmark);

    res.json({id, id_landmark, name_landmark, info, year_landmark});
});

Router.put('/:id_landmark', async (req, res) => {
    const {
        id_landmark
    } = req.params;

    const {
        info
    } = req.body;

    await update(id_landmark, info);

    res.json({id_landmark, info});

});

Router.delete('/:id_landmark', async (req, res) => {
    const {
        id_landmark
    } = req.params;

    await remove(id_landmark);

    res.status(200).end();
});

module.exports = Router;