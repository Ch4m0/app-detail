<template>
  <v-list flat="flat">
    <v-list-item-group>
      <template v-for="(audio, index) in audios">
        <v-list-item :key="audio.id">
          <v-list-item-content>
            <audio :id="audio.id" class="audio" controls>
              <source :src="audio.uri" type="audio/wav" />Your browser does not support the audio element.
            </audio>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  name: "AudioList",
  props: ["audios"],
  data() {
    return {
      currentAudioPlaying: null
    };
  },
  methods: {
    // onVideoPlay(event) {
    //   const audio = event.target;
    //   if (this.currentAudioPlaying != undefined) {
    //     this.currentAudioPlaying.pause();
    //   }
    //   this.currentAudioPlaying = audio;
    // }
  }
};
</script>
<style lang="scss" scoped>
audio {
  width: 100%;
}
</style>
