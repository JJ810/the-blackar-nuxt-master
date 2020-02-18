<template>
  <div v-if="isVisible">
    <v-footer dark height="auto" class="black py-4 px-2 pb-1" >
      <v-container fluid grid-list-sm>
        <v-layout row wrap>

          <!--CONTACTS INFO-->
          <v-flex xs12 sm12 md4 class="px-5 mb-2">
            <div class="mb-2">
              <span class="headline">{{ title }}</span>
            </div>
            <div>
              <div class="grey--text mb-2" v-for="contact in contacts" :key="contact.title">
                <v-icon left>{{ contact.icon }}</v-icon>
                <span>{{ contact.title }}</span>
              </div>
            </div>
          </v-flex>

          <v-divider class="hidden-sm-and-up"></v-divider>

          <!--LINKS-->
          <v-flex xs12 sm12 md4 class="px-5 mb-2">
            <div  class="mb-2">
              <span class="headline">Links</span>
            </div>
            <div>
              <div class="grey--text mb-2" v-for="link in links" :key="link.text" router :to="link.path">
                <v-icon left>{{ link.icon }}</v-icon>
                <span>{{ link.text }}</span>
              </div>
            </div>
          </v-flex>

          <v-divider class="hidden-sm-and-up"></v-divider>

          <!--CONTACT US-->
          <v-flex xs12 sm12 md4 class="px-5 mb-2">
            <div class="mb-2">
              <span class="headline">Contact us</span>
            </div>
            <v-form>
              <v-text-field box dark type="text" name="name" label="Name"></v-text-field>
              <v-text-field box dark type="email" name="email" label="Email"></v-text-field>
              <v-textarea box dark type="text" name="message" label="message" multi-line></v-textarea>
              <v-btn>Send</v-btn>
            </v-form>
          </v-flex>

        </v-layout>

        <v-divider></v-divider>

        <v-layout row justify-space-around>
          <v-flex xs12>
            <div class="text-xs-center pt-3">
              copyright 2018
            </div>
          </v-flex>

        </v-layout>
      </v-container>
    </v-footer>
  </div>
</template>
<script>
  export default{
    name: 'my-footer',
    data () {
      return {
        title: 'theBlackar',
        isVisible: true,
        links:[
          { icon: 'home', text: 'Home', path: '/'},
          { icon: 'location_on', text: 'Reservation', path: '/reservation'},
          { icon: 'person', text: 'Profile', path: '/profile'},
        ],
        contacts:[
          {title: 'P.O. Box 2324, IL 60613', icon: 'home', href: '#'},
          {title: '+1 (773) 788-6769', icon: 'stay_current_portrait', href: 'tel:+17736560850'},
          {title: 'info@theblackar.com', icon: 'email', href: 'mailto:info@theblackar.com'}
        ],
        icons:['fab fa-cc-paypal', 'fab fa-cc-visa','fab fa-cc-mastercard', 'fab fa-cc-amex', 'fab fa-cc-discover'],

      }
    },
    watch:{
      '$route': 'hideFooter'
    },

    methods:{
      hideFooter(){
        if(this.$route.path === '/signin' || this.$route.path === '/signup' || this.$route.path === '/reservation' || this.$route.path === '/booking'){
          this.isVisible = false
        }else{
          this.isVisible = true
        }
      }
    },

  }
</script>