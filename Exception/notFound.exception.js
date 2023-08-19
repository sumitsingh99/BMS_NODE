const BaseException = require('../Exception/base.exception')

class NotFoundException extends BaseException{
    constructor(param) {
        super(`Not found resource for ${param}` , 'NOT_FOUND' , 404);
    }
}

module.exports= NotFoundException