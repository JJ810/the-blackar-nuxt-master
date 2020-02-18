<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn
        @click.stop="dialog = true"
        color="primary"
        text
        v-on="on">
        Enter
        <v-icon right>exit_to_app</v-icon>
      </v-btn>

    </template>

    <v-card class="pa-3">
      <v-tabs min-hight="500" grow center-active @change="onTabChange">
        <!--TABS LINKS-->
        <v-tab >SignIn</v-tab>
        <v-tab>SignUp</v-tab>
        <v-tabs-slider color="primary"></v-tabs-slider>
        <!--SIGNIN TAB-->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <SignInForm :loading="loading" @validate="signIn" />
              <SocialSignIn />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <!--SIGN UP TAB-->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <SignUpForm @validate="signUp" />
            </v-card-text>
          </v-card>
        </v-tab-item>

      </v-tabs>
    </v-card>
  </v-dialog>
</template>

<script>
  import SignInForm from "../Forms/SignInForm";
  import SignUpForm from "../Forms/SignUpForm";
  import SocialSignIn from "../Partials/SocialSignIn";
  import { mapActions, mapGetters } from 'vuex';
  export default {
    name: "LoginDialog",
    components: { SignInForm, SignUpForm, SocialSignIn},
    data() {
      return {
        tab: null,
        dialog: false
      }
    },
    computed: {
      ...mapGetters(['loading', 'error', 'user'])
    },
    methods:{
      ...mapActions([
        'signUserInGoogle',
        'signUserInFacebook',
        {
          onDismiss: 'clearError',
        },
      ]),
      signIn ({email, password}) {
        this.$store.dispatch('signUserIn', {
          email: email,
          password: password,
        });
      },
      signUp(user){
        this.$store.dispatch('signUserUp', user);
      },
      onTabChange() {
        if(this.error){
          this.$store.commit('CLEAR_ERROR')
        }
      }
    },

    watch:{
      user(val){
        if(val){
          this.dialog = false
        }
      }
    }
  }
</script>

