<template>
  <v-flex xs12 md6>
    <div class="pa-2">
      <v-card class="pa-3" >
        <v-subheader color="black">Rider info</v-subheader>
        <v-form ref="form" v-model="valid">
          <app-alert v-if="alert" :text="'You must be signed in to complete reservation!'" @dismissed="alert = !alert"></app-alert>
          <v-text-field
            v-model="rider.name"
            :rules="rules.name"
            type="text"
            label="First name">
          </v-text-field>
          <v-text-field
            v-model="rider.email"
            :rules="rules.email"
            type="email"
            label="Email">
          </v-text-field>
          <v-text-field
            v-model="rider.phone"
            :rules="rules.phone"
            :counter="10"
            type="phone"
            label="Phone">
          </v-text-field>
          <v-textarea
            v-model="rider.note"
            :rules="rules.note"
            type="text"
            label="Note for driver">
          </v-textarea>
          <v-btn
            @click.prevent="validate"
            :disabled="!valid"
            color="primary"
            block
            class="mt-5"
          >
            Confirm
          </v-btn>
        </v-form>
      </v-card>
    </div>
  </v-flex>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "RidersForm",
    data(){
      return{
        alert: false,
        valid: false,
        rider:{
          name: '',
          email: '',
          phone: '',
          note: ''
        },
        rules:{
          name:[
            v => !!v || 'First name is required',
            v => (v && v.length > 3) || 'First name must be at least 3 characters'
          ],
          email:[
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          phone:[
            v => !!v || 'Phone number is required',
            v => (v && v.length >= 10) || 'Phone number must be 10 digits ex. 2223334444'
          ],
          note:[
            v => v && v.length <= 50 || 'Your note must be no more than 50 characters'
          ]
        },
      }
    },
    computed:{
      ...mapGetters(['user', 'error', 'loading'])
    },
    methods:{
      validate () {
        if (this.$refs.form.validate()) {
          if(this.user !== null){
            this.$emit('onRiderInfo', this.rider)
            this.$refs.form.reset();
          }else{
            this.alert = !this.alert
          }

        }
      }
    },
    watch:{
      validate(val){
        alert(val)
        if(this.user !== null){
          this.$refs.form.reset();
        }
      }
    }
  }
</script>

<style scoped>
</style>
