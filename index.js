var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Modelclass = require('../node-rest-crud-api/db/EmployeeModel.js');
var request = require('request');
var keycloak = require('../node-rest-crud-api/keycloak/keycloak-config.js').initKeycloak();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function (req, res, next) {
    if (req.headers.authorization) {
        // configure the request to your keycloak server
        const options = {
            method: 'GET',
            url: 'http://10.14.171.10:8082/realms/hoand30/protocol/openid-connect/userinfo',
            headers: {
                // add the token you received to the userinfo request, sent to keycloak
                Authorization: req.headers.authorization,
            }
        };

        // send a request to the userinfo endpoint on keycloak
        request(options, (error, response, body) => {
            if (error) throw new Error(error);

            // if the request status isn't "OK", the token is invalid
            if (response.statusCode !== 200) {
                res.status(401).json({
                    error: `unauthorized`,
                });
            }
            // the token is valid pass request onto your next function
            else {
                return res.send({ error: false, message: 'hello' })
            }
        });
    } else {
        // there is no token, don't process request further
        res.status(401).json({
            error: `unauthorized`,
        });
    }
});

var checkAuthenticated = (req, res, next) => {
    if (req.headers.authorization) {
        console.log(req.headers.authorization);
        return next();
    }
    res.redirect("/")
}

//GetAllEmployee
app.get('/employee', checkAuthenticated, function (req, res, next) {

    let result = Modelclass.get_all();
    result.then(function (value) { console.log(value); res.json(value) })
        .catch(function (error) { console.log(error) });

});

//GetEmployeeById
app.get('/employee/:id', checkAuthenticated, function (req, res, next) {

    let result = Modelclass.find(req.params.id);
    result.then(function (value) { console.log(value); res.json(value) })
        .catch(function (error) { console.log(error) });

});

//AddNewEmployee
app.post('/employee', checkAuthenticated, function (req, res, next) {

    // data = {
    //     idemployee: req.body.idemployee,
    //     user_id: req.body.user_id,
    //     user_name: req.body.user_name,   
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     work_status: req.body.work_status,
    //     line_mgt: req.body.line_mgt,
    //     classification: req.body.classification,
    //     department_code: req.body.department_code,
    //     start_date_profile: req.body.start_date_profile,
    //     end_date_profile: req.body.end_date_profile,
    //     init_application: req.body.init_application,
    //     company_restr: req.body.company_restr,
    //     application: req.body.application,
    //     date_last_sign_on: req.body.date_last_sign_on,
    //     time_last_sign_on: req.body.time_last_sign_on,
    //     local_ref: req.body.local_ref,
    //     printer_for_rpts: req.body.printer_for_rpts,
    //     attributes: req.body.attributes,
    //     area: req.body.area,
    //     authoriser: req.body.authoriser,
    //     co_code: req.body.co_code,
    //     title: req.body.title,
    //     position: req.body.position,
    //     id: req.body.id
    // }   
    let result = Modelclass.create(req.body);
    result.then(function (value) { console.log(value); res.json(value) })
        .catch(function (error) { console.log(error) });
});

//UpdateEmployeeById
app.put('/employee/:id', checkAuthenticated, function (req, res, next) {

    let body = req.body;
    let result = Modelclass.update(req.params.id, body);
    result.then(function (value) { console.log(value); res.json(value) })
        .catch(function (error) { console.log(error) });

});

//DeleteEmployeeById
app.delete('/employee/:id', checkAuthenticated, function (req, res, next) {

    let result = Modelclass.delete(req.params.id);
    result.then(function (value) { console.log(value); res.json(value) })
        .catch(function (error) { console.log(error) });

});


// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;