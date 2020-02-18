<template>
  <v-snackbar value="snackbar"  :timeout="4000" multi-line color="black" @input="$emit('onClose')">
    <span v-if="!user">You have signed out!</span>
    <span v-else-if="user">Welcome, {{ user.name }}!</span>
    <v-btn flat color="white" @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
  export default {
    name: "Snackbar",
    props: ['snackbar', 'user'],
  }
</script>
