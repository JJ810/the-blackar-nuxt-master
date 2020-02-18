<template>
  <v-list>
    <v-alert outline :value="true" type="warning" v-if="totalPrice < 25">Minimum order price applies <span>$25</span></v-alert>
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title v-text=""> <v-icon left>flag</v-icon>{{ order.distance.text }} x $3.00/mi</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-content>
        <v-list-tile-title v-text="`$${order.pricePerMile}`" class="text-xs-right"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title v-text=""> <v-icon left>access_time</v-icon>~{{ order.duration.text }} x $0.60/min</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-content>
        <v-list-tile-title v-text="`$${this.order.pricePerMinutes}`" class="text-xs-right"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-list-tile-title v-text=""> <v-icon color="grey" left>receipt</v-icon>Total</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-content>
        <v-list-tile-title v-text="`$${this.order.total}`" class="text-xs-right"></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: "TripDetails",
    props: ['order'],
    computed: {
      totalPrice(){
        if(this.order){
          const total = this.order.pricePerMiles + this.order.pricePerMinutes;
          return  total > 25 ? total : 25
        }
      }
    }
  }
</script>

<style scoped>

</style>
