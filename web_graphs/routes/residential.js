var express = require('express');
var router = express.Router();

// Require controller modules
var listing_controller = require('../controller/listingController');
var locality_controller = require('../controller/localityController');
var district_controller = require('../controller/districtController');

// Listing Routes

router.get('/', listing_controller.index);

router.get('/api/count_listings_locality/', listing_controller.count_listings_locality)

router.get('/api/price_locality/', listing_controller.price_locality)

module.exports = router;
