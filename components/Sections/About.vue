<template>
  <v-layout row justify-center class="mb-5">
    <v-flex xs12 sm10 md12>
      <v-layout row wrap>
        <v-flex xs12 sm12 md6>
          <v-img :src="data.imgUrl"></v-img>
        </v-flex>
        <v-flex xs12 sm12 md6>
          <blockquote style="font-size: 22px;" class="blockquote mt-5">
            <div class="display-2 mb-3">{{ data.title }}</div>
            {{ data.text }}
          </blockquote>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'about',
    props: {
      data: {
        type: Object,
        default: {}
      },
    },
  }

</script>
