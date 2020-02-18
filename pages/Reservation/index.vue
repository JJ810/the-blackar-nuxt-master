<template>
  <div>
    <GmapMap
      ref="map"
      class="map"
      :zoom="11"
      :center="googleAPI.center"
      :options="googleAPI.options" />

    <v-layout row justify-start>
      <v-flex xs12 md4>
        <v-card class="mb-2 px-3 py-2">
          <div class="mb-2" style="position: relative">
            <v-icon class="pinIcon" color="red">location_on</v-icon>
            <GmapAutocomplete
              ref="origin"
              class="form-control mt-1"
              @place_changed="setPickupPlace"
              placeholder="From" />
          </div>
          <v-divider class="my-2"></v-divider>
          <div style="position: relative">
            <v-icon class="pinIcon" color="green">location_on</v-icon>
            <GmapAutocomplete
              ref="origin"
              class="form-control mb-1"
              @place_changed="setDropoffPlace"
              placeholder="Where" />
          </div>
        </v-card>
        <v-card v-if="googleAPI.directionsDisplay" class="px-3 py-2 mb-2">
          <BookingForm @onValidOrder="validate" />
        </v-card>
      </v-flex>
    </v-layout>
    <BookingDialog
      :order="order"
      :dialog="dialog"
      @onClose="dialog = false" />
  </div>
</template>

<script>
  import BookingForm from "../../components/Forms/BookingForm";
  import BookingDialog from "../../components/Dialogs/BookingDialog";
  import mapStyle from "../../services/mapStyle";
  import moment from 'moment'
  export default {
    name: "index",
    components: { BookingForm, BookingDialog },
    meta:{ requireFooter: false },
    data() {
      return {
        order: null,
        dialog: false,
        googleAPI: {
          originPlace: null,
          destPlace: null,
          distance: null,
          duration: null,
          directionsService: null,
          directionsDisplay: null,
          center: {
            lat: 41.881832,
            lng: -87.623177,
          },
          options: mapStyle
        },
      }
    },
    methods: {
      setPickupPlace(place) {
        this.setPlace(place, 'ORIGN')
      },
      setDropoffPlace(place) {
        this.setPlace(place, 'DEST')
      },
      setPlace(place, mode){
        if(mode === 'ORIGN') {
          this.googleAPI.originPlace = place;
        }else {
          this.googleAPI.destPlace = place;
        }
        if(this.googleAPI.directionsDisplay){
          this.googleAPI.directionsDisplay.set('directions', null)
        }
        this.getRoute()
      },
      getRoute(){
        if (!this.googleAPI.originPlace || !this.googleAPI.destPlace) {
          return;
        }
        this.googleAPI.directionsService = new google.maps.DirectionsService();
        this.googleAPI.directionsDisplay = new google.maps.DirectionsRenderer();
        this.googleAPI.directionsDisplay.setMap(this.$refs.map.$mapObject);
        this.googleAPI.directionsService.route({
          origin: {'placeId': this.googleAPI.originPlace.place_id},
          destination: {'placeId': this.googleAPI.destPlace.place_id},
          travelMode: 'DRIVING'
        },(response, status) => {
          if (status === 'OK') {
            this.googleAPI.directionsDisplay.setDirections(response); // draws the polygon to the map
            this.googleAPI.distance = response.routes[0].legs[0].distance;
            this.googleAPI.duration = response.routes[0].legs[0].duration;
          } else {
            console.log('Directions request failed due to ' + status)
          }
        })
      },
      validate(val) {
        const { originPlace, destPlace, distance, duration } = this.googleAPI;
        const newOrder = {
          pickup: {
            address: originPlace.formatted_address,
            placeId: originPlace.place_id
          },
          dropoff: {
            address: destPlace.formatted_address,
            placeId: destPlace.place_id
          },
          distance: distance,
          duration: duration,
          pricePerMile: this.calcPrice('miles', distance),
          pricePerMinutes: this.calcPrice('minutes', duration),
          total: this.calcTotal(distance, duration),
          ...val
        };

        this.order = newOrder;

        console.log(newOrder);
        console.log(this.$children[3].$refs);
        this.dialog = !this.dialog
      },
      calcPrice(by, data){
        const perMile = 3.00;
        const perMin = 0.60;
        return by === 'miles' ? Math.round(((data.value/1000)/1.6 * perMile)) : Math.round(((data.value/60) * perMin));
      },
      calcTotal(distance, duration){
        return this.calcPrice('miles', distance) + this.calcPrice('minutes', duration)
      },
    },

  }
</script>

<style scoped>
  input.form-control {
    border-radius: 0;
    border-bottom: 0 solid #E5E5E4;
    height: 40px;
    width: calc(100% - 35px);
    margin-left: 30px;
    outline: none;
  }

  .pinIcon{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .map{
    width: 100%;
    height: calc(100vh - 64px);
    padding-top: 50px;
    position: absolute;
    top: 0;
    left:0;
  }
</style>
