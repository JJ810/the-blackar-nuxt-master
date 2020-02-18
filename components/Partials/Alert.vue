<template>
  <v-alert dark error dismissible @input="onClose" :value="true">
    <p class="white--text">{{ text }}</p>
  </v-alert>
</template>
<script>
  export default{
    name: 'alert',
    props:['text'],
    methods:{
      onClose(){
        this.$emit('dismissed')
      }
    }
  }
</script>
