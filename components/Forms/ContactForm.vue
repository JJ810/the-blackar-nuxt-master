<template>
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
</template>

<script>
  export default {
    name: "ContactForm"
  }
</script>

<style scoped>

</style>
