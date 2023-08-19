const exception = require('../Exception/base.exception');
const NotFound = require('../Exception/notFound.exception')
const { City , Movie , Payment } = require('../Models/models')
const utils = require('../Utils/payment.utils');

class PaymentController {
    register(app){
        app.route('/get-payment/:PaymentId')
            .get(async (request, response , next)=>{
                try{
                    const id = request.params.PaymentId;
                    const paymentDetails = await Payment.findAll({
                        where: { id }
                    });
                    if(paymentDetails.length === 0 || !paymentDetails){
                        throw new NotFound(id)
                    }

                    return response.json(paymentDetails).status(200)
                }
                catch(error){
                    console.log(error)
                    throw new exception("Something went wrong!!")
                }
            })

        app.route('/complete-payment')
            .post(async (request, response , next) =>{
                try{
                    const amount = request.body.amount;
                    const paymentStatus = request.body.paymentStatus;
                    const id = request.body.userId;
                    const PaymentObject = await Payment.build({
                        amount : amount,
                        timeStamp : utils.getTransactionTime(),
                        paymentStatus: paymentStatus,
                        transactionNumber : utils.getTransactionNumber(),
                        userId : id


                    })
                    await PaymentObject.save()

                    return response.status(200).send(`Transaction of ${amount} is successfully updated!!`)
                }
                catch(err){
                    console.log(err)
                    throw new exception("Error while updating payment!!")
                }


            })
    }
}

module.exports = PaymentController