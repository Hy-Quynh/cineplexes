const asyncHandler = require('express-async-handler');
const Cineplex = require('../../model/cineplexes');

module.exports = {
    index: asyncHandler(async (req, res) => {
      const findAll = await Cineplex.getAll(6);
      res.json(findAll);
    })
};
