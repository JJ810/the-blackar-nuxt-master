<template>
  <v-form v-model="valid" ref="form" class="py-2">
    <app-alert v-if="error" :text="error.message"></app-alert>
    <v-text-field
      v-model="newUser.name"
      :rules="rules.name"
      :counter="30"
      type="text"
      name="fullname"
      label="Full name">
    </v-text-field>
    <v-text-field
      v-model="newUser.email"
      :rules="rules.email"
      type="email"
      name="email"
      label="Email">
    </v-text-field>
    <v-text-field
      v-model="newUser.password"
      :rules="rules.password"
      type="password"
      name="password"
      label="Password">
    </v-text-field>
    <v-text-field
      v-model="newUser.confirmPassword"
      :rules="rules.confirmPassword"
      type="password"
      name="confirmPassword"
      label="Confirm Password">
    </v-text-field>
    <v-text-field
      v-model="newUser.phone"
      type="number"
      name="phone"
      label="Phone">
    </v-text-field>

    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="newUser.dob"
          label="Date of birth"
          :rules="rules.dob"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        dark
        ref="picker"
        v-model="newUser.dob"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
    <v-btn
      :disabled="!valid"
      :loading="loading"
      @click="validate"
      class="white--text"
      color="black"
      block

    >Submit</v-btn>

  </v-form>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "SignUpForm",
    data(){
      return {
        newUser:{
          name: '',
          email: '',
          phone: '',
          dob: '',
          password: '',
          confirmPassword: '',
        },
        rules:{
          name: [
            v => !!v || 'First name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters'
          ],
          email: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          password: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be at least 6 characters'
          ],
          confirmPassword: [
            v => !!v || 'Password confirm is required',
            v => (v && v == this.newUser.password) || 'Password does not match',
            v => (v && v.length >= 6) || 'Password must be at least 6 characters'
          ],
          // phone: [
          //   v => !!v || 'Phone is required',
          //   v => (v && v.length >= 10) || 'Phone must be not less than 10 digits'
          // ],
          dob: [
            v => !!v || 'Date of birth is required',
            //v => (v && v.length >= 9) || 'Ppone must be not less than 9 digits'
          ],
        },
        valid: false,
        menu: false
      }
    },
    computed:{
      ...mapGetters(['loading', 'error', 'user'])
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
      validate() {
        if (this.$refs.form.validate()) {
          console.log(this.newUser);
          this.$emit('validate', this.newUser);
        }
      }
    },
    watch: {
      menu(val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      user(val){
        if(val){
          this.$refs.form.reset()
        }
      }
    }
  }
</script>
