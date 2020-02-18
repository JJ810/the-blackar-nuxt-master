<template>
  <v-dialog :value="dialog" width="900" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-card-title fixed primary-title class="headline black lighten-3 white--text py-2">
        Booking confirmation
        <v-spacer></v-spacer>
        <v-btn flat icon dark @click="$emit('onClose')">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-layout justify-center row wrap>
          <trip-info v-if="order" :order="order" />
          <rider-form @onRiderInfo="submitOrder" />
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import RiderForm from "../Forms/RiderForm";
  import TripInfo from "../Trip/TripInfo";
  export default {
    name: "BookingDialog",
    props:['dialog', 'order'],
    components:{ RiderForm, TripInfo },
    methods: {
      submitOrder(riderInfo) {
        this.$store.dispatch('submitOrder', {
          ...riderInfo,
          ...this.order
        });
        this.$emit('onClose')
      }
    }
  }
</script>

<style scoped>

</style>
