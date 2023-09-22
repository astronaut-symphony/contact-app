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



const save = (name, telp, email) => {
    const data = { name, telp, email };
    const file = fs.readFileSync(dataPath, 'utf-8');
    const contacts = JSON.parse(file);
    let error = false;
    
    const duplicate = contacts.find((contact) => contact.name == name);
    if (duplicate) {
        console.log(chalk.bgRed.white.bold(`Contact with name ${name} already exists.`));
        error = true;
    }
    
    if (telp) {
        if (!validator.isMobilePhone(telp, 'id-ID')) {
            console.log(chalk.bgRed.white.bold(`Phone number is invalid`));
            error = true;
        }
    }
    
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.bgRed.white.bold(`Email address is invalid`));
            error = true;
        }
    }
    
    if (error) {
        return false;
    }
    
    contacts.push(data);
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    
    console.log(chalk.green.inverse.bold(`New contact added successfully.`));
};



module.exports = { save };