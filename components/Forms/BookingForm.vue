<template>
  <v-form ref="form" v-model="valid">
    <v-select
      v-model="selectedRide"
      :items="rides"
      prepend-icon="directions_car"
      label="Select ride"
      dense
      height="40px">
    </v-select>

    <v-text-field v-model="date" label="Date" :rules="rules.date" type="date" prepend-icon="date_range"></v-text-field>
    <v-text-field v-model="time" label="Time" :rules="rules.time" type="time" prepend-icon="access_time"></v-text-field>
    <v-btn @click.stop="validate()" :disabled="!valid" large block color="primary">Book</v-btn>
  </v-form>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "BookingForm",
    data(){
      return{
        valid: false,
        selectedRide: 'Sedan',
        rides: ['Sedan', 'SUV'],
        date: moment().format('YYYY-MM-DD'),
        time: null,
        rules:{
          date:[
            v => !!v || 'Please, pick a date',
            v => v >= moment().format('YYYY-MM-DD') || 'Date must be valid'
          ],
          time: [
            v => !!v || 'Please, pick a time',
            v => v >= '04:30' && v < '23: 00' || 'Out of operation range',
          ],
        },
      }
    },
    methods: {
      validate() {
        if(this.$refs.form.validate()){
          const orderOptions = {
            ride: this.selectedRide,
            date: this.date,
            time: this.time,
          };
          this.$emit('onValidOrder', orderOptions)
        }
      }
    }
  }
</script>

<style scoped>

</style>
