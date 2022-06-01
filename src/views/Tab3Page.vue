<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Contact</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Contact</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Default -->
<ion-modal :is-open="false">
  <ion-content>Modal Content</ion-content>
</ion-modal>

<!-- Use a trigger -->
<ion-button id="trigger-button">Click to open modal</ion-button>
<ion-modal >
  <ion-content>Modal Content</ion-content>
</ion-modal>

<!-- Sheet Modal -->
<ion-modal 
  :is-open="false"
  :breakpoints="[0.1, 0.5, 1]"
  :initialBreakpoint="0.5"
>
  <ion-content>Modal Content2</ion-content>
</ion-modal>

<!-- Card Modal -->
<ion-modal
  :is-open="false"
  :swipe-to-close="true"
  :presenting-element="$parent.$refs.ionRouterOutlet"
  trigger="trigger-button"
>
  <ion-content>Modal card</ion-content>
</ion-modal>

<!-- Passing Props -->
<ion-modal :is-open="false">
  <app-vue-component title="Ionic"></app-vue-component>
</ion-modal>

<!-- Require Action Sheet confirmation before dismissing -->
<ion-modal
  :is-open="false"
  :can-dismiss="canDismiss"
>
  <ion-content>Modal Content</ion-content>
</ion-modal>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Formulaire contact</ion-card-subtitle>
          <ion-card-title>Ajouter un contact</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-input placeholder="Nom" required="true" v-model="contactForm.name" clear-input value=""></ion-input>
          <ion-input placeholder="Prénom" required clear-input value="" v-model="contactForm.surname"></ion-input>
          <ion-input placeholder="Entreprise" required clear-input value="" v-model="contactForm.company"></ion-input>
          <ion-input placeholder="Numéro de téléphone" required clear-input value="" v-model="contactForm.phoneNumber">
          </ion-input>
          <ion-input placeholder="Adresse" required clear-input value="" v-model="contactForm.address"></ion-input>
          <ion-input placeholder="Email" required clear-input value="" v-model="contactForm.mail"></ion-input>
          <ion-input placeholder="Note" required clear-input value="" v-model="contactForm.note"></ion-input>
          <ion-button @click="createContact()" expand="block">Ajouter le contact</ion-button>

        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-subtitle>Liste des contacts</ion-card-subtitle>
          <ion-card-title>Ma liste des contacts</ion-card-title>
        </ion-card-header>
        <div v-if="contacts.length > 0">
        <div v-for="(contact, index) in contacts" :key="index">
          Nom {{ contact.name }}
        </div></div>
        <div v-if="contacts.length === 0">
        <p style="color: red;">Vous n'avez pas de contact pour le moment</p>
        </div>
        

        <ion-card-content>
        </ion-card-content>
      </ion-card>


    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, setTransitionHooks } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonModal, actionSheetController } from '@ionic/vue';
import { Contact } from '@/domains/contact.interface';
import contactCommand from '@/commands/contact.command';
import contactQuery from '@/query/contact.query';

export default defineComponent({
  name: 'Tab1Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonInput, IonModal, IonButton},
  data() {
    return {
      contactForm: {
        surname: "",
        name: "",
        address: "",
        company: "",
        phoneNumber: "",
        photo: "",
        mail: "",
        note: ""
      } as Contact,
      contacts: [] as Array<Contact>
    }
  },
  mounted() {
    this.getContacts();
  },
  methods: {
    createContact() {
      const contact: Contact = this.contactForm;
      contactCommand.createContact(contact);
      this.getContacts();
    },
    getContacts() {
      this.contacts = contactQuery.getContacts();
    }
  },
  setup() {
      const canDismiss = async () => {
        const actionSheet = await actionSheetController.create({
          header: 'Are you sure you want to discard your changes?',
          buttons: [
            {
              text: 'Discard Changes',
              role: 'destructive'
            },
            {
              text: 'Keep Editing',
              role: 'cancel'
            }
          ]
        });
        
        await actionSheet.present();
        
        const { role } = await actionSheet.onDidDismiss();
        
        if (role === 'destructive') {
          return true;
        }
        
        return false;
      };
      
      return { canDismiss }
    }
  });


</script>
