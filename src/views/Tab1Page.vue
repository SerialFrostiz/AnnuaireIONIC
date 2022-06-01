<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Liste de contact</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card>
    <ion-card-header>
      <ion-card-title><b>Création de contact</b></ion-card-title>
    </ion-card-header>
    <ion-item><ion-input v-model="contactform.name" placeholder="Nom"></ion-input></ion-item>
    <ion-item><ion-input v-model="contactform.surname" placeholder="Prénom"></ion-input></ion-item> 
    <ion-item><ion-input v-model="contactform.photo" placeholder="Photo"></ion-input></ion-item> 
    <ion-item><ion-input v-model="contactform.company" placeholder="Entreprise"></ion-input></ion-item>  
    <ion-item><ion-input v-model="contactform.phoneNumber" placeholder="Téléphone"></ion-input></ion-item> 
    <ion-item><ion-input v-model="contactform.address" placeholder="Adresse"></ion-input></ion-item> 
    <ion-item><ion-input v-model="contactform.mail" placeholder="Email"></ion-input></ion-item> 
    <ion-item><ion-input v-model="contactform.note" placeholder="Note"></ion-input></ion-item> 
    <ion-button v-on:click="createContact()"><ion-title>Valider</ion-title></ion-button>  
      </ion-card>  
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { Contact } from '@/domains/contact.interface';
import { defineComponent } from 'vue';
import { IonBackButton, IonButton, IonButtons} from '@ionic/vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput } from '@ionic/vue';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel } from '@ionic/vue';
import { pin, walk, warning, wifi, wine } from 'ionicons/icons';
import contactCommand from '@/commands/contact.command';

export default  defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage , IonCard, IonCardHeader, IonCardTitle, IonItem, IonButton, IonInput},
  data() {return{
    contactform: {
      name: "",
      surname: "",
      address: "",
      company: "",
      phoneNumber: "",
      photo: "",
      mail: "",
      note: ""
} as Contact }},
    methods: {
      createContact() {
        const contact: Contact = this.contactform;
        return contactCommand.createContact(contact);
      }
    }
    
});
</script>
