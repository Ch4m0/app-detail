<template>
  <v-row class="py-6">
    <div v-for="(file, index) in files" :key="index" class="text-center">
      <font-awesome-icon color="pink" :icon="['fas', 'file-pdf']" style="font-size: 40" />
      <a class="d-block black--text" :href="file.uri" target="_blank">PDF - 0{{ index }}</a>
    </div>
  </v-row>
</template>

<script>
export default {
  name: "FileList",
  props: ["files"]
};
</script>
