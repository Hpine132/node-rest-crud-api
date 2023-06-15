const Model = require('../db/model.js');
module.exports =  new class Modelclass extends Model {

    constructor(){
        super('employee');
    }

}