const config = {
    user: 'Ayala',
    password: '214260416',
    server: 'localhost', 
    database: 'CoronaHMO',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, 
        trustServerCertificate: true
    }
};

module.exports = config;
