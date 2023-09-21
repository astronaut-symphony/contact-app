const contacts = require('./contacts.js');

const main = async () => {
    const name = await contacts.input('Name: ');
    const telp = await contacts.input('Telp: ');
    const email = await contacts.input('Email: ');
    
    contacts.save(name, telp, email);
};

main();