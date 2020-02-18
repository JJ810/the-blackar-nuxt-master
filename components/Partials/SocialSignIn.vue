<template>
  <div>
    <div class="text-xs-center mb-3" style="position: relative">
      <v-divider></v-divider>
      <span class="or">or</span>
    </div>
    <v-layout row wrap>
      <v-flex xs6>
        <v-btn block outline @click="signUserInGoogle">Google</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn block outline @click="signUserInFacebook">Facebook</v-btn>
      </v-flex>
      <v-flex xs12>
        <div class="text-xs-center py-2">
          <a href="#">Help I forgot my password</a>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: "SocialSignIn",
    methods:{
      ...mapActions([
        'signUserInGoogle',
        'signUserInFacebook',
      ]),
    }
  }
</script>
<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Audiowide&display=swap');
  .or{
    position: absolute;
    top: -10px;
    left:50%;
    margin-left:-20px;
    width:40px;
    height: 20px;
    background-color: #fff;
  }
  .bg{
    background-color: #f1f1f1;
  }
</style>

