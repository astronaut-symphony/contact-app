const fs = require('fs');

const dataDir = './data';
const dataPath = dataDir + '/contacts.json';

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}



const loadContacts = () => {
    const file = fs.readFileSync(dataPath, 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
};

const detailContact = (name) => {
    const contacts = loadContacts();
    const contact = contacts.find((contact) => contact.name === name);
    return contact;
};

const addContact = (contact) => {
    const contacts = loadContacts();
    contacts.push(contact);
    saveContacts(contacts);
};

const saveContacts = (contacts) => {
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
};

const deleteContact = (name) => {
    const contacts = loadContacts();
    const filtered = contacts.filter((contact) => contact.name !== name);
    saveContacts(filtered);
};

const updateContacts = (updatedContact) => {
    const contacts = loadContacts();
    const filtered = contacts.filter((contact) => contact.name !== updatedContact.prevName);
    
    delete updatedContact.prevName;
    filtered.push(updatedContact);
    saveContacts(filtered);
};

const nameCheck = (name) => {
    const contacts = loadContacts();
    return contacts.find((contact) => contact.name.toLowerCase() == name.toLowerCase());
};



module.exports = { loadContacts, detailContact, addContact, deleteContact, updateContacts, nameCheck };