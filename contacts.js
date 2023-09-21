const fs = require('fs');

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
    
    const duplicate = contacts.find((contact) => contact.name == name);
    if (duplicate) {
        console.log(`Contact with name ${name} already exists.`);
        return false;
    }
    
    contacts.push(data);
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    
    console.log(`New contact added successfully.`);
};



module.exports = { save };