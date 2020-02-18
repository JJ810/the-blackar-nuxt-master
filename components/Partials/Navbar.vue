<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="4000" multi-line color="black">
      <span v-if="!user">You have signed out!</span>
      <span v-else-if="user">Welcome, {{ user.name }}!</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-navigation-drawer
      v-model="drawer"
      class="primary"
      fixed
      temporary
      app
      dark
    >
      <v-toolbar color="primary" dark>
        <v-toolbar-title class="logo mx-auto" v-text="title" />
      </v-toolbar>
      <v-divider></v-divider>
      <!--USER INFO START-->
      <v-layout column align-center justify-space-around v-if="user">
        <v-flex xs12 class="my-1">
          <v-avatar size="100" color="grey">
            <v-img v-if="user.imgUrl" :src="user.imgUrl"></v-img>
          </v-avatar>
          <div class="grey--text subheading mt-1 text-xs-center">
            <span class="text-xs-center">{{ user.name }}</span>
          </div>
        </v-flex>
        <v-flex>
          <v-btn class="mb-3" v-if="user"  small @click="signOut">Sign out</v-btn>
        </v-flex>
        <v-flex>
        </v-flex>
      </v-layout>
      <!--USER INFO END-->

      <v-divider></v-divider>
      <v-list>
        <v-list-tile
          v-for="(item, i) in links"
          :key="i"
          :to="item.route"
          router
          exact
          active-class="active"
          class="white--text"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.text" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar  fixed app color="primary" dark>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-toolbar-title class="logo" v-text="title" />
      <v-spacer />

      <v-menu offset-y class="hidden-sm-and-down text--white">
        <v-btn flat slot="activator" colore="primary">
          <v-icon left>expand_more</v-icon>
          <span>Menu</span>
        </v-btn>
        <v-list class="text--white" light>
          <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
            <v-list-tile-title> {{ link.text }}</v-list-tile-title>
          </v-list-tile>
         </v-list>
      </v-menu>
      <!--NAVIGATION LINKS END-->

      <v-btn v-if="user" flat color="gray" class="hidden-sm-and-down" @click="signOut">
        <span>Sign out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
      <LoginDialog v-if="!user"></LoginDialog>

    </v-toolbar>
  </div>
</template>

<script>
  import LoginDialog from "../Dialogs/LoginDialog";
  import { mapGetters } from 'vuex'
  export default {
    name: 'Navbar',
    components:{ LoginDialog },
    data() {
      return {
        title: 'theBlackar',
        drawer: false,
        snackbar: false,
        links: [
          {icon: 'home', text: 'Home', route: '/'},
          {icon: 'location_on', text: 'Reservation', route: '/reservation'},
          {icon: 'person', text: 'Profile', route: '/profile'},
        ]

      }
    },
    computed:{
      ...mapGetters(['user']),
      // links(){
      //   return !this.user ? this.pages.filter(item => item.text !== 'Profile') : this.pages;
      // }
    },
    methods:{
      signOut(){
        this.$store.dispatch('signUserOut');
        if(this.$route.name === 'Profile'){
          this.$router.push('/')
        }
        this.snackbar = true
      }
    },
    watch:{
      user(val){
        if(val){
          this.snackbar = true
        }
      }
    }
  }
</script>
<style>
  @import url('https://fonts.googleapis.com/css?family=Audiowide&display=swap');
  .logo{
    font-family: 'Audiowide';
  }

  .active{
    color: red;
  }

</style>
