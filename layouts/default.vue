<template>
  <v-app>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
header {
  box-sizing: content-box;
}

.v-toolbar {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.02), 0px 1px 10px 0px rgba(0, 0, 0, 0.02);
}

.head-avatar,
.head-title {
  align-self: center !important;
}
</style>
