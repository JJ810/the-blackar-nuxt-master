<template>
  <swiper-slide v-if="feed" class="ml-1">
    <v-card class="pa-3 text-xs-center" height="150">
      <div class="black--text subheading">{{feed.text}}</div>
      <v-rating v-model="feed.rating" color="black" background-color="black" readonly size="17"></v-rating>
      <div class="text-xs-center grey--text">
        {{feed.name}}
      </div>
    </v-card>
  </swiper-slide>
</template>

<script>
  export default {
    name: "Slide",
    props: ['feed']
  }
</script>
