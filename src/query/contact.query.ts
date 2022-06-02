import { Contact } from "@/domains/contact.interface";
export default {
    getContacts(): Array<Contact> {
        const contacts = localStorage.getItem('contact') as string;
        const parsedContacts = JSON.parse(contacts);
        if(this.isContactsListEmpty(parsedContacts)){
            return [];
        }
        return parsedContacts;
    },

    isContactsListEmpty(contactsList: Array<Contact>): boolean {
        if(contactsList) {
            return false
        }
        return true;
    },

    getFavs(): Array<Contact> {
        const contacts = localStorage.getItem('contact') as string;
        const parsedContacts = JSON.parse(contacts);
        const favs = localStorage.getItem('fav') as string;
        const parsedFavs = JSON.parse(favs);
        const listFavs: Array<Contact> = [];
        if(this.isFavsListEmpty(parsedFavs)){
            localStorage.setItem('fav',JSON.stringify(listFavs));
            return [];
        }
        for (const [key,value] of Object.entries(parsedFavs)) {
             const index: number = value as number;
             listFavs.push(parsedContacts[index]);
        }
        return listFavs;
    },

    isFavsListEmpty(favsList: Array<number>): boolean {
        if(favsList) {
            
            return false
        }
        return true;
    }
}