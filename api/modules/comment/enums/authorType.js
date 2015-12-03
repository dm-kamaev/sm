var enums = require.main.require('./app/components/enums');
module.exports = {
    enumName: 'authorType',
    __proto__: enums.enumPrototype,

    PARENT: 'Parent',
    SCHOLAR: 'Scholar',
    GRADUATE: 'Graduate'
};

