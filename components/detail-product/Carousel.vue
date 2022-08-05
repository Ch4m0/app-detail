<template>
  <div>
    <template v-if="gallery.length > 0">
      <v-carousel height="520" hide-delimiters :class="{ 'onlyOne': gallery.length == 1}">
        <v-carousel-item eager class="bgn-carousel-item" v-for="(slide, i) in gallery" :key="i">
          <v-row class="row-content pa-sm-0" align="center" justify="center">
            <template v-if="gallery[i].type === 1">
              <video
                @click="playPauseVideo"
                @canplay="updatePaused"
                @playing="updatePaused"
                @pause="updatePaused"
              >
                <source :src="gallery[i].uri" type="video/mp4" />Your browser does not support HTML5 video.
              </video>
              <v-btn
                absolute
                elevation="0"
                fab
                dark
                large
                color="rgba(0, 0, 0, 0.6)"
                class="animation"
                @click="playPauseVideo"
              >
                <v-icon dark v-if="btnVideo === 'pause'">mdi-play</v-icon>
                <v-icon dark v-else>mdi-pause</v-icon>
              </v-btn>
            </template>

            <template v-else>
              <img :src="gallery[i].uri" />
            </template>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </template>
  </div>
</template>
<script>
import { filterByType } from "@/utils/multimedia/multimedia";

export default {
  name: "Carousel",
  props: ["product"],
  data() {
    return {
      videoElement: null,
      multimedia: this.product.data.multimedia,
      gallery: [],
      btnVideo: "pause"
    };
  },
  methods: {
    updatePaused(event) {
      this.videoElement = event.target;
    },
    playPauseVideo(event) {
      if (this.videoElement.paused) {
        this.videoElement.play();
        this.btnVideo = "play";
      } else {
        this.videoElement.pause();
        this.btnVideo = "pause";
      }
    }
  },
  computed: {
    playing() {
      return !this.paused;
    }
  },
  mounted() {
    if (this.multimedia) {
      const video = filterByType(this.multimedia, 1);
      const img = filterByType(this.multimedia, 0);
      if ((video.length > 0) & (img.length > 0)) {
        this.gallery = [...img, ...video];
      } else if ((video.length === 0) & (img.length > 0)) {
        this.gallery = img;
      } else if ((video.length > 0) & (img.length === 0)) {
        this.gallery = video;
      }
    } else {
      Console.log("empty");
    }
  }
};
</script>
<style lang="scss" scoped>
$breakpoint-medium: 641px;

.bgn-carousel-item {
  background-color: #f5f5f5;
}
.row-content {
  height: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

@keyframes opacity {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}

.animation {
  animation: opacity 5s;
}
@supports (object-fit: cover) {
  .row-content img,
  .row-content video {
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
}
.row-content img {
  @media (max-width: $breakpoint-medium) {
    height: auto;
    width: 100%;
  }
}
::v-deep .onlyOne {
  .v-window__prev {
    display: none;
  }
  .v-window__next {
    display: none;
  }
}
</style>
