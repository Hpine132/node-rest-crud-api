var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'hoand30_keycloak',
    bearerOnly: true,
    serverUrl: 'http://10.14.171.10:8082/auth',
    realm: 'hoand30',
    grantType: "client_credentials",
    credentials: {
        secret: 'EzND4VvsmdyG2S64syYdNZALAMjFjppk'
    }
};

function initKeycloak(){
    if(_keycloak){
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    }
    else{
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({store: memoryStore}, keycloakConfig);

        return _keycloak;
    }
}

function getKeycloak(){
    if(!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first');
    }

    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};