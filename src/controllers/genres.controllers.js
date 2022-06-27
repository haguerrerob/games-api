import _ from '../db.js';
const { Genre } = _;



export const getGenre = async (req, res) => {
    try {
        const result = await Genre.findAll();
        res.send(result);
    } catch (err) {
        console.error(err);
    }
};

