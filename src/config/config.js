const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: 'mongodb://localhost:27017/social',
        origin: [ 'http://localhost:4200' ],
        methods: [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ],
        credentials: true,
        jwtSecretKey: 'd98a1c0a-869a-4275-aff8-dba4bf0fb2cb',
    },
    production: {
        port: process.env.PORT || 3000,
        dbURL: process.env.DB_URL_CREDENTIALS,
        origin: []
    }
};

module.exports = config[env];