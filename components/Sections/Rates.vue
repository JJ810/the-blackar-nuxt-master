<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="display-2 mb-5 text-xs-center">{{data.title}}</div>
    </v-flex>
    <v-layout wrap justify-center>
      <v-flex
        v-for="car in data.cars"
        :key="car.title"
        xs12 sm10 md6
        v-match-heights="{
              el: ['.chips', '#carImg'],  // Array of selectors to fix
              disabled: [ // Array of heights where the plugin will not set the heights
                767, // If a string is provided this will be used as a max bound
                [920, 1200], // If an array is provided it will be used as min-max bounds in that order
              ]
            }">
        <v-card class="mx-2 mb-5 pa-3">
          <v-card-title>
            <span class="headline pb-0 mx-auto mt-0">{{ car.title }}</span>
          </v-card-title>
          <div class="text-xs-center">
            <span class="grey--text text-xs-center">Models</span>
          </div>
          <div  class="chips text-xs-center mb-3">
            <v-chip small v-for="(option, i) in car.options" :key="i">{{ option }}</v-chip>
          </div>
          <v-img id="carImg" :src="car.imgSrc" width="80%" min-height="250" class="mx-auto"></v-img>
          <div class="text-xs-center">
            <span class="grey--text text-xs-center">Details</span>
          </div>
          <div class="chips text-xs-center">
            <v-chip small v-for="descOpt in car.descOptions" :key="descOpt">{{ descOpt }}</v-chip>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
    name: 'rates',
    props: {
      data: {
        title:{
          type: String,
          required: true,
        },
        cars: {
          type: Array,
          required: true
        }
      },
    },

  }

</script>

<style>

</style>
