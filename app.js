const contacts = require('./contacts.js');
const yargs = require('yargs');

yargs.command({
    command: 'add', 
    describe: 'Add new contact', 
    builder: {
        name: {
            describe: 'Contact name', 
            demandOption: true, 
            type: 'string'
        }, 
        telp: {
            describe: 'Phone number', 
            demandOption: false, 
            type: 'string'
        }, 
        email: {
            describe: 'email address', 
            demandOption: false, 
            type: 'string'
        }
    }, 
    handler(argv) {
        contacts.save(argv.name, argv.telp, argv.email);
    }
}).demandCommand();

yargs.command({
    command: 'delete', 
    describe: 'Delete contact', 
    builder: {
        name: {
            describe: 'Contact name', 
            demandOption: true, 
            type: 'string'
        }
    }, 
    handler(argv) {
        contacts.remove(argv.name);
    }
});

yargs.command({
    command: 'list', 
    describe: 'Show contact list', 
    handler() {
        contacts.list();
    }
});

yargs.parse();