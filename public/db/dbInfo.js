module.exports = (function(){
    return {
        local : {
            host : 'localhost',
            port : '3306',
            user : 'root',
            password : 'gozld123',
            database : 'thePlanner',
        },
        real : {
            host : '',
            port : '',
            user : '',
            password : '',
            database : '',
        },
        dev : {
            host : '',
            port : '',
            user : '',
            password : '',
            database : '',
        }
    }
})();