const exception = require('../Exception/base.exception');
const NotFound = require('../Exception/notFound.exception')
const { City , Movie , User } = require('../Models/models')
const utils = require('../Utils/user.utils');


class UserController {
    register(app){
        app.route('/get-user/:email')
            .get(async (request, response , next)=>{
                try{
                    const email = request.params.email;
                    const userDetails = await User.findAll({
                        where: { email }
                    });
                    if(userDetails.length === 0 || !userDetails){
                        throw new NotFound(email)
                    }

                    return response.json(userDetails).status(200)
                }
                catch(error){
                    console.log(error)
                    throw new exception("Something went wrong!!")
                }
            })

        app.route('/register-user')
            .post(async (request, response , next) =>{
                try{
                    const name = request.body.name;
                    const email = request.body.email;
                    const password = request.body.password;
                    const UserObject = await User.build({
                        username : name,
                        email : email,
                        password: utils.getHashedPassword(password).toString()

                    })
                    await UserObject.save()

                    return response.status(200).send(`User successfully registered with  ${email} `)
                }
                catch(err){
                    console.log(err)
                    throw new exception("Error while updating payment!!")
                }


            })
    }
}

module.exports = UserController