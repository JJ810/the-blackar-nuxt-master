<template>
  <v-form v-model="valid" ref="form">
    <v-text-field v-model="name" :rules="rules.name" type="text" name="name" label="Name"></v-text-field>
    <v-textarea v-model="text" :rules="rules.text" type="text" name="feedback" label="Feedback" max="50"></v-textarea>
    <div class="text-xs-center">
      <v-rating v-model="rating" color="black" background-color="black" size="40"></v-rating>
    </div>
    <v-card-actions class="pb-4">
      <v-btn
        :disabled="!valid"
        :loading="loading"
        @click="validate"
        class="white--text mx-auto"
        color="black">Submit</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Alert from "../Partials/Alert";
  export default {
    name: "FeedbackDialog",
    components: { Alert },
    data() {
      return {
        valid: false,
        rating: 5,
        name: '',
        text: '',
        rules:{
          name:[
            v => !!v || 'Name is required',
            v => (v && v.length > 3) || 'Name must be at least 3 characters'
          ],
          text:[
            v => !!v || 'Password is required',
            v => (v && v.length < 50) || 'Your feedback must be no more than 50 words'
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['loading', 'error', 'user'])
    },
    methods: {
      validate() {
        if(this.$refs.form.validate()){

          this.$store.dispatch('addFeedback', {
            creatorId: this.user.id,
            name: this.name,
            rating: this.rating,
            text: this.text
          }).then(() =>{
            this.$refs.form.reset();
            this.$emit('onClose');
          });

        }
      }
    }
  }
</script>
