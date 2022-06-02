<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
      <div v-if="contactsList.length > 0">    
      <div v-for="(contact, index) in contactsList" :key="index">
      <ion-nav>
          <ion-accordion-group>
      <ion-accordion>
      <ion-item slot="header">
        <ion-icon :icon="person"></ion-icon>
        <ion-label>{{contact.name}} {{contact.surname}}</ion-label>
      </ion-item>
      <ion-list slot="content" style="padding:4px 0px;">
        <ion-button @click="updateContact(updatedContactsList)">Editer</ion-button>
        <ion-button @click="createFav(index)" style="--background:green;">Favori</ion-button>
        <ion-button @click="deleteContact(index)" style="--background:red;">Supprimer</ion-button>
        
        <ion-item>
          <ion-label>Name : </ion-label><ion-input v-model="updatedContactsList[index].name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Surname : </ion-label><ion-input v-model="updatedContactsList[index].surname"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Telephone</ion-label><ion-input v-model="updatedContactsList[index].phoneNumber"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Address : </ion-label><ion-input v-model="updatedContactsList[index].address"></ion-input>
        </ion-item>
      </ion-list>
    </ion-accordion>
    </ion-accordion-group>
      </ion-nav>
      </div>
      </div>
      </ion-list>

      <ExploreContainer name="Tab 2 page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { Contact } from '@/domains/contact.interface';

import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonIcon,IonButton, IonInput} from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import contactQuery from '@/query/contact.query';
import { person } from 'ionicons/icons';
import contactCommand from '@/commands/contact.command';

export default defineComponent({
  name: 'Tab2Page',
  components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, IonIcon, IonButton, IonInput},
  mounted(){
    this.getContacts();
    this.getFavs();
    //this.updatedContactsList = this.contactsList;

  },
  data() {
    return{
      contactsList: [] as Array<Contact>,
      updatedContactsList: [] as Array<Contact>,
      favsList: [] as Array<Contact>
    }
  },
  methods: {
    getContacts() {
     this.contactsList = contactQuery.getContacts();
     this.updatedContactsList = contactQuery.getContacts();
     return 
    },
    getFavs() {
     this.favsList = contactQuery.getFavs();
     this.updatedContactsList = contactQuery.getContacts();
     return 
    },
    updateContact(updatedContactsList: Array<Contact>) {
      contactCommand.updateContact(updatedContactsList);
      this.contactsList = contactQuery.getContacts();
      this.updatedContactsList = this.contactsList;
      return 
    },
    deleteContact(contactIndex: number) {
      contactCommand.deleteContact(contactIndex);
      this.favsList = contactQuery.getFavs();
      this.contactsList = contactQuery.getContacts();
      this.updatedContactsList = this.contactsList;
      return
    },
    createFav(contactIndex: number) {
      contactCommand.createFav(contactIndex);
      this.favsList = contactQuery.getFavs();
      return
    }
     },
  setup() {
      return { person }
    },
    activated() {
      this.contactsList = contactQuery.getContacts();
     this.updatedContactsList = this.contactsList;
     this.favsList = contactQuery.getFavs();
    }
  
});
</script>
