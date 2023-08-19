const exception = require('../Exception/base.exception');
const NotFound = require('../Exception/notFound.exception')
const { City , Movie } = require('../Models/models')

class MovieController {
    register(app){
        app.route('/get-movie')
            .get(async (request, response , next)=>{
                try{
                    const id = request.body.CityId;
                    const movies = await Movie.findAll({
                        where: { id },
                        include: City
                    });
                    if(movies.length === 0 || !movies){
                        throw new NotFound(id)
                    }

                    return response.json(movies).statusCode(200).message("Movies fetched successfully!!")
                }
                catch(error){
                    throw new exception("Something went wrong!!")
                }
            })

        app.route('/add-movie')
            .post(async (request, response , next) =>{
                try{

                    const name = request.body.name;
                    const description = request.body.description;
                    const duration = request.body.duration;
                    const rating = request.body.rating;
                    const releaseDate = request.body.release_date;
                    const movieFeature = request.body.movie_features;
                    const language = request.body.language;

                    const MovieObject = await Movie.build({
                        name : name,
                        description : description,
                        duration : duration,
                        rating : rating,
                        release_date : releaseDate,
                        movie_features : movieFeature,
                        language : language

                    })
                    await MovieObject.save()

                    return response.status(200).send(`${name} added to the database`)
                }
                catch(err){
                    throw new exception("Error while Adding city!!")
                }


            })
    }
}

module.exports = MovieController