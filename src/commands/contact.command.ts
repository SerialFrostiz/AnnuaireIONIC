import { Contact } from "@/domains/contact.interface";
import contactQuery from "@/query/contact.query";
export default {
    createContact(contact: Contact): void {
            const contacts: Array<Contact> = contactQuery.getContacts();
            contacts.push(contact);            
            localStorage.setItem('contact',JSON.stringify(contacts));
        return 
    },
 
    updateContact(contactsList: Array<Contact>) {
        localStorage.setItem('contact',JSON.stringify(contactsList));
        return
    },
 
    deleteContact(contactIndex: number) {
            this.deleteFavContact(contactIndex);
            const listContact = JSON.parse(localStorage.getItem('contact') as string);
            const newListContacts: Array<Contact> = [];
            let i = 0;
            for (const [key,value] of Object.entries(listContact)) {
                console.log(value);
                if (contactIndex != i){
                    newListContacts.push(value as Contact);
                }
                i = ++i;
                }
            localStorage.setItem('contact',JSON.stringify(newListContacts));
        return
    },

    createFav(indexContact: number): void {
        const fav: number = indexContact;
        const favs: Array<number> = JSON.parse(localStorage.getItem('fav') as string);
        for(const id of favs){
            if(indexContact == id)
            return;
        }
        favs.push(fav);
        localStorage.setItem('fav',JSON.stringify(favs));
        
        return 
    },
 
    updateFav(favsList: Array<Contact>) {
        localStorage.setItem('fav',JSON.stringify(favsList));
        return
    },
 
    deleteFav(favIndex: number) {
        const listFavs = JSON.parse(localStorage.getItem('fav') as string);
        const newListFavs: Array<Contact> = [];
        let i = 0;
        for (const [key,value] of Object.entries(listFavs)) {
            console.log(value);
            if (favIndex != i){
                newListFavs.push(value as Contact);
            }
            i = ++i;
            }
        localStorage.setItem('fav',JSON.stringify(newListFavs));
        return
    },

    deleteFavContact(favIndex: number) {
        localStorage.setItem('test',JSON.stringify(favIndex));
        const listFavs = JSON.parse(localStorage.getItem('fav') as string);
        const newListFavs: Array<Contact> = [];
        for (const [key,value] of Object.entries(listFavs)) {
            if (favIndex != value){

                newListFavs.push(value as Contact);
            }
        }
        localStorage.setItem('fav',JSON.stringify(newListFavs));
        return
    }
}