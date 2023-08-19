const exception = require('../Exception/base.exception');
const NotFound = require('../Exception/notFound.exception')
const { City , Movie , User, Ticket, Show} = require('../Models/models')
const utils = require('../Utils/payment.utils')
const { Sequelize, Transaction } = require('sequelize');

class ShowController {
    register(app){
        app.route('/get-show/:ShowId')
            .get(async (request, response , next)=>{
                try{
                    const id = request.body.ShowId;
                    const ShowObject = await Show.findAll({
                        where: { id }

                    });
                    if(ShowObject.length === 0 || !ShowObject){
                        throw new NotFound(id)
                    }

                    return response.json(ShowObject).statusCode(200).message("Movies fetched successfully!!")
                }
                catch(error){
                    console.log(error)
                    throw new exception("Something went wrong!!")
                }
            })


        app.route('/create-show')
            .post(async (request, response, next) => {

                try {
                    const startTime = request.body.start;
                    const endTime = request.body.end;
                    const feature = request.body.features;
                    const movieId = request.body.movieId;
                    const AudiId = request.body.AudiId;
                    const ShowObject = await Show.build({
                        startTime: startTime,
                        endTime: endTime,
                        showFeatures: feature,
                        MovieId: movieId,
                        AuditoriumId: AudiId

                    });
                    await ShowObject.save();
                    return response.status(200).send('Show Created Successfully');
                } catch (err) {
                    console.log(err);
                    throw new Error('Error while creating show!!');
                }
            });

    }
}
module.exports = ShowController