<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center"></div>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  created() {
    if (process.client) {
      //window.location = `https://peiky.com/`;
    }
  }
};
</script>
