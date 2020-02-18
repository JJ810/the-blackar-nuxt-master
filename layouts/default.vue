<template>
  <v-app>
    <Navbar />
    <v-content style="background-color: #fff; color: #000;">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <Footer v-if="$route.meta.requireFooter" />
  </v-app>
</template>

<script>
import Navbar from "../components/Partials/Navbar";
import Footer from "../components/Partials/Footer";
export default {
  components:{ Navbar, Footer },
}
</script>
