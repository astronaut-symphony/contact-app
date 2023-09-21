const fs = require('fs');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataDir = './data';
const dataPath = dataDir + '/contacts.json';

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}



const input = (prompt) => {
    return new Promise((resolve, reject) => {
        rl.question(prompt, result => {
            resolve(result);
        });
    });
};

const save = (nama, telp, email) => {
    const data = { nama, telp, email };
    const file = fs.readFileSync(dataPath, 'utf-8');
    const contacts = JSON.parse(file);
    
    contacts.push(data);
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    rl.close(); 
};



module.exports = { input, save };