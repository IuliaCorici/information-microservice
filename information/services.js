const {
    query
} = require('../data');

const { ServerError } = require('../errors');


const getAll = async () => {
    console.info('Getting all landmarks...');

    const landmarks = await query('SELECT * FROM landmarks');

    return landmarks;
};

const getById = async (id_landmark) => {
    console.info(`Getting landmark with id ${id_landmark}...`);

    const landmarks = await query('SELECT * FROM landmarks WHERE id_landmark=$1', [id_landmark]);
    
    if (landmarks.length !== 1) {
        throw new ServerError('Landmark does not exist!', 404);
    }

    return landmarks[0];
};


const add = async (id_landmark, name_landmark, info, year_landmark) => {
    console.info(`Adding landmark with name: ${name_landmark} and id: ${id_landmark}, from year ${year_landmark}. Here is some info: ${info}.`);

    try {
        const landmarks = await query('INSERT INTO "landmarks" (id_landmark, name_landmark, info, year_landmark) VALUES ($1, $2, $3, $4) RETURNING id', [id_landmark, name_landmark, info, year_landmark]);
        return landmarks[0].id;

    } catch (e) {
        if (e.code === '23505') {
            throw new ServerError('Landmark already exists!', 409);
        }
        throw e;
    }
};

const update = async (id_landmark, info) => {
    console.info(`Updating landmark id: ${id_landmark} with info: ${info}.`);

    await query('UPDATE landmarks SET info=$2 WHERE id_landmark=$1', [id_landmark, info]);
};

const remove = async (id_landmark) => {
    console.info(`Removing landmark with id: ${id_landmark}...`);

    await query('DELETE FROM landmarks WHERE id_landmark=$1', [id_landmark]);
}

module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}