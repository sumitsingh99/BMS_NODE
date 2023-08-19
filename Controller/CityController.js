const exception = require('../Exception/base.exception');
const { City } = require('../Models/models')
const {request, response} = require("express");
const {canTreatArrayAsAnd} = require("sequelize/lib/utils");
class CityController {
    register(app){
        app.route('/get-city')
            .get(async (request, response , next)=>{
                try{
                    const rows = await City.findAll()
                    if(rows.length > 0){
                        return response.status(200).json(rows)
                    }
                    else{
                        throw new exception("Cities data are not available at the moment!!")
                    }

                }
                catch(err){
                    console.log(err)
                    throw new exception("Not Able to fetch the city at the moment!!")

                }
            })

        app.route('/add-city/:CityName')
            .post(async (request, response , next) =>{
                try{
                    const city = request.params.CityName;
                    const newCity = await City.build({
                        name : city
                    })
                    await newCity.save()
                    return response.status(200).send(`${City} added to the database`);

                }
                catch(err){
                    console.log(err,"error")
                    throw new exception("Error while Adding city!!")
                }


            })
    }
}

module.exports = CityController