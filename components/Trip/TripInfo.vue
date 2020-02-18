<template>
  <v-flex xs12 md6 v-if="order">
    <div class="pa-2 mb-3">

      <v-card class="pa-3">
        <v-subheader color="black">Trip Details</v-subheader>
        <v-text-field  label="From" :value="order.pickup.address" readonly prepend-icon="place"></v-text-field>
        <v-text-field label="To" :value="order.dropoff.address" readonly prepend-icon="place"></v-text-field>
        <v-text-field type="text" label="My ride" :value="order.ride" readonly prepend-icon="directions_car"></v-text-field>
        <v-text-field type="date" label="Date" :value="order.date" readonly prepend-icon="event"></v-text-field>
        <v-text-field type="time" label="Time" :value="order.time" readonly prepend-icon="access_time"></v-text-field>
        <v-subheader>Price Breakdown</v-subheader>
        <trip-details :order="order"></trip-details>
      </v-card>

    </div>
  </v-flex>
</template>

<script>
  import TripDetails from "./TripDetails";
  export default {
    name: "TripInfo",
    props: {
      order: {
        required: true
      },
    },
    components:{
      TripDetails
    },
    data() {
      return {
        panel: [true, true, true]
      }
    },

  }
</script>
