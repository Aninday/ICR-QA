const dataFilePath = './tests/data/Creadential.json';
const fs = require('fs');

// Function to save new data to the JSON file by merging it with existing data
export async function saveData(newData, section) {
    let data = {};
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    data = JSON.parse(rawData);
    data[section] = { ...data[section], ...newData };
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Function to retrieve data from the JSON file
export function getData(section) {
    let data = {};
    const rawData = fs.readFileSync(dataFilePath, 'utf8');
    data = JSON.parse(rawData);
    return data[section] || {};
}
