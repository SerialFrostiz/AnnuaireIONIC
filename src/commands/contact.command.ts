import { Contact } from "@/domains/contact.interface";
import contactQuery from "@/query/contact.query";
export default {
    createContact(contact: Contact): void {
            const contacts: Array<Contact> = contactQuery.getContacts();
            contacts.push(contact);            
            localStorage.setItem('contact',JSON.stringify(contacts));
        return 
    },

    deleteContact(): void {

        return
    }
}