<template>
  <v-form v-model="valid" ref="form" class="py-2">
    <app-alert v-if="error" :text="error.message"></app-alert>
    <v-text-field
      v-model="email"
      :rules="rules.email"
      type="email"
      name="email"
      label="Email">
    </v-text-field>
    <v-text-field
      v-model="password"
      :rules="rules.password"
      type="password"
      name="password"
      label="Password" >
    </v-text-field>

    <v-btn
      :disabled="!valid"
      :loading="loading"
      @click="validate"
      color="black"
      class="mb-3 white--text"
      block
    >
      Sign in
    </v-btn>
  </v-form>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    name: "SignInForm",
    data() {
      return {
        valid: false,
        email: '',
        password: '',
        rules:{
          email: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          password: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be at least 6 characters'
          ],
        }
      }
    },
    computed:{
      ...mapGetters(['loading', 'error', 'user'])
    },
    watch:{
      user(val){
        if(val){
          this.$refs.form.reset()
        }
      }
    },
    methods: {
      validate() {
        if (this.$refs.form.validate()) {
          this.$emit('validate', { email: this.email, password: this.password })
        }
      }
    },
  }
</script>

<style scoped>
</style>
