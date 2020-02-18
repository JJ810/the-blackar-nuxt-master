<template>
  <v-layout row wrap>
    <v-flex xs12>
      <div class="display-2 mb-5 text-xs-center">{{ title }}</div>
    </v-flex>
    <v-flex xs12>
      <app-spinner v-if="!loadedFeeds"></app-spinner>
      <Slider v-if="loadedFeeds" :feedbacks="loadedFeeds"></Slider>
    </v-flex>
  </v-layout>
</template>

<script>
  import Slider from '../Carousel/Slider';
  export default{
    name: 'feedbacks',
    components:{ Slider },
    data(){
      return{
        title: 'What they say',
        model: null,
      }
    },
    computed:{
      loadedFeeds(){
        return this.$store.state.feeds
      }
    },
    mounted(){
      this.$store.dispatch('loadFeeds');
    }
  }
</script>

