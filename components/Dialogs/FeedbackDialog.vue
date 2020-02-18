<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on }">
      <v-btn
        @click.stop="dialog = true"
        text
        v-on="on">
        Leave your feedback
      </v-btn>
    </template>
    <v-snackbar v-model="snackbar" :timeout="4000" multi-line color="black">
      <span>Thank you, feedback submitted</span>
      <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-card>
      <v-card-title class="headline primary white--text" color="primary" dark>
        Leave Feedback
        <v-spacer></v-spacer>
        <v-btn dark icon @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pa-4">
        <Alert v-if="error" :text="error.message" />
        <FeedbackForm @onClose="feedSubmited" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import Alert from "../Partials/Alert";
  import FeedbackForm from "../Forms/FeedbackForm";
  export default {
    name: "FeedbackDialog",
    components: { Alert, FeedbackForm },
    data() {
      return {
        dialog: false,
        snackbar: false
      }
    },
    computed: {
      error(){
        return this.$store.getters.error
      }
    },
    methods: {
      feedSubmited() {
        this.dialog = false
        this.snackbar = true
      }
    }
  }
</script>
