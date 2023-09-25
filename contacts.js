const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const dataDir = './data';
const dataPath = dataDir + '/contacts.json';

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}



const load = () => {
    const file = fs.readFileSync(dataPath, 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
};

const save = (name, telp, email) => {
    const data = { name, telp, email };
    const contacts = load();
    let error = false;
    
    const duplicate = contacts.find((contact) => contact.name == name);
    if (duplicate) {
        console.log(chalk.bgRed.white.bold(`Contact with name ${name} already exists. 409 `));
        error = true;
    }
    
    if (telp) {
        if (!validator.isMobilePhone(telp, 'id-ID')) {
            console.log(chalk.bgRed.white.bold(`Phone number is invalid. 400 `));
            error = true;
        }
    }
    
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.bgRed.white.bold(`Email address is invalid. 400 `));
            error = true;
        }
    }
    
    if (error) {
        return false;
    }
    
    contacts.push(data);
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    
    console.log(chalk.green.inverse.bold(`New contact ${name} successfully added. 200 `));
};

const remove = (name) => {
    const contacts = load();
    const newContacts = contacts.filter((contact) => contact.name.toLowerCase() !== name.toLowerCase());
    
    if (contacts.length == newContacts.length) {
        console.log(chalk.bgRed.white.bold(`Contact ${name} not found. 404 `));
        return false;
    }
    
    fs.writeFileSync(dataPath, JSON.stringify(newContacts));
    
    console.log(chalk.green.inverse.bold(`Contact ${name} successfully deleted. 200 `));
};

const list = () => {
    const contacts = load();
    console.log(chalk.yellow.inverse.bold('Contact list:'));
    contacts.forEach((contact, i) => console.log(`${i+1}. ${contact.name}`));
};

const detail = (name) => {
    const contacts = load();
    const contact = contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());
    
    if (!contact) {
        console.log(chalk.bgRed.white.bold(`Contact ${name} not found. 404 `));
        return false;
    }
    
    console.log(chalk.inverse.bold(contact.name));
    if (contact.telp) {
        console.log(`Phone: ${contact.telp}`);
    }
    if (contact.email) {
        console.log(`Email: ${contact.email}`);
    }
};



module.exports = { save, remove, list, detail };