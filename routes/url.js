const express = require('express');
const CityController = require('../Controller/CityController');
const MovieController = require('../Controller/MovieController');
const PaymentController = require('../Controller/PaymentController');
const UserController = require('../Controller/UserController');
const TicketController = require('../Controller/TicketController')
const ShowController = require('../Controller/ShowController');

const router = express.Router()

const cityController = new CityController()
cityController.register(router)

const movieController = new MovieController()
movieController.register(router)

const paymentController = new PaymentController()
paymentController.register(router)

const userController = new UserController()
userController.register(router)

const ticketController = new TicketController()
ticketController.register(router)

const showController = new ShowController()
showController.register(router)

module.exports = router;
