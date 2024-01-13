import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.join('db', 'contacts.json');

async function listContacts() {
  const data = await fsPromises.readFile(contactsPath, { encoding: 'utf-8' });
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find(({ id }) => id === contactId) ?? null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) return;

  const removedContacts = contacts.splice(index, 1);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };

  contacts.push(newContact);
  await fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

removeContact('rsKkOQUi80UsgVPCcLZZW');

export { listContacts, getContactById, removeContact, addContact };

// node src/contacts
