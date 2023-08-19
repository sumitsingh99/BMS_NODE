const exception = require('../Exception/base.exception');
const NotFound = require('../Exception/notFound.exception')
const { City , Movie , User, Ticket, Seat} = require('../Models/models')
const utils = require('../Utils/payment.utils')
const { Sequelize, Transaction } = require('sequelize');

class TicketController {
    register(app){
        app.route('/get-Ticket/:UserId')
            .get(async (request, response , next)=>{
                try{
                    const id = request.body.UserId;
                    const TicketObject = await Ticket.findAll({
                        where: { userId },
                        include: User
                    });
                    if(TicketObject.length === 0 || !TicketObject){
                        throw new NotFound(id)
                    }

                    return response.json(TicketObject).statusCode(200).message("Movies fetched successfully!!")
                }
                catch(error){
                    console.log(error)
                    throw new exception("Something went wrong!!")
                }
            })


        app.route('/generate-ticket')
            .post(async (request, response, next) => {
                const transaction = await Sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE });

                try {
                    const totalAmount = request.body.totalAmount;
                    const showId = request.body.showId;
                    const userId = request.body.userId;
                    const paymentId = request.body.paymentId;
                    const seatId = request.body.seatId;

                    // Lock the seat record
                    const seat = await Seat.findByPk(seatId, { transaction, lock: true });
                    if (!seat) {
                        throw new Error('Seat not found');
                    }

                    const ticketObject = await Ticket.build({
                        totalAmount: totalAmount,
                        timeofBooking: utils.getTransactionTime(),
                        ShowId: showId,
                        UserId: userId,
                        PaymentId: paymentId,
                        SeatId: seatId
                    });
                    await ticketObject.save();
                    // Commit the transaction
                    await transaction.commit();

                    return response.status(200).send('Ticket Generated');
                } catch (err) {
                    console.log(err);

                    // Rollback the transaction on error
                    await transaction.rollback();
                    throw new Error('Error while adding city!!');
                }
            });

    }
}
module.exports = TicketController