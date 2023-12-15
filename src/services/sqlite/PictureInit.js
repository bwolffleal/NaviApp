import Contacts from '../../services/sqlite/Contacts';

function yusukeInit() {
    const picture = require("../../assets/FoxPicture.png");
    const newName = {
      name: 'Yusuke Kitagawa',
      picture,
    }
    Contacts.updateContact("0418d6ef-7131-4fd2-899a-4fb325535ee7", newName)
      .then( contact => console.log(contact) )
      .catch( err => console.log(err) )
}

function annInit() {
    const picture = require("../../assets/PantherPicture.png");
    const newName = {
      name: 'Ann Takamaki',
      picture,
    }
    Contacts.updateContact("9150c3dd-8a96-4b5b-b82d-45f4a301a925", newName)
      .then( contact => console.log(contact) )
      .catch( err => console.log(err) )
}

function makotoInit() {
    const picture = require("../../assets/QueenPicture.png");
    const newName = {
      name: 'Makoto Niijima',
      picture,
    }
    Contacts.updateContact("371e61b6-8aec-427e-a4f5-e349a2ee1a2b", newName)
      .then( contact => console.log(contact) )
      .catch( err => console.log(err) )
}

function ryujiInit() {
    const picture = require("../../assets/SkullPicture.png");
    const newName = {
      name: 'Ryuji Sakamoto',
      picture,
    }
    Contacts.updateContact("0afb61aa-db59-4083-90aa-123615c47c6c", newName)
      .then( contact => console.log(contact) )
      .catch( err => console.log(err) )
}

function futabaInit() {
    const picture = require("../../assets/OraclePicture.png");
    const newName = {
      name: 'Futaba Sakura',
      picture,
    }
    Contacts.updateContact("f5e45718-a6c8-4586-8450-e9c80959fea1", newName)
      .then( contact => console.log(contact) )
      .catch( err => console.log(err) )
}

function goroInit() {
    const picture = require("../../assets/CrowPicture.png");
    const newName = {
      name: 'Goro Akechi',
      picture,
    }
    Contacts.updateContact("166fe4ec-6e70-4699-8a1e-08d21f218a25", newName)
      .then( contact => console.log(contact) )
      .catch( err => console.log(err) )
}

function haruInit() {
    const picture = require("../../assets/NoirPicture.png");
    const newName = {
      name: 'Haru Okumura',
      picture,
    }
    Contacts.updateContact("ead49e5d-8b50-4939-aac8-fdda2c9aaf64", newName)
      .then( contact => console.log(contact) )
      .catch( err => console.log(err) )
}

export default {
    yusukeInit,
    ryujiInit,
    annInit,
    makotoInit,
    futabaInit,
    goroInit,
    haruInit,
}