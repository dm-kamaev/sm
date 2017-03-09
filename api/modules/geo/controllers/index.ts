import * as express from 'express';
const router = express.Router();

const addressController = require('./addressController');

router.get('/school/:id/address', addressController.getAddresses);
router.get('/school/:school_id/address/:id', addressController.getAddress);

// import {RegionInstance, Model as RegionModel} from '../models/Region';
// import {CityInstance, Model as CityModel} from '../models/city';
// router.get('/city', async function (req, res) {
    // var regions: RegionInstance[] = await RegionModel.findAll();
    // res.json(regions);
    // var regions: CityInstance[] = await CityModel.findAll();
    // res.json(regions);
// });

export {router};
