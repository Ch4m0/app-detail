<template>
  <v-expansion-panels elevation="0">
    <v-expansion-panel
      elevation="0"
      v-if="(file = multimedia && multimedia.find(e => e.type === 2))"
      v-on:click="callListByType(2)"
    >
      <v-expansion-panel-header class="secondary">
        <v-col class="audio-list-icon">
          <img src="~assets/microphone.svg" width="32" />
        </v-col>
        <v-col>
          <h3 class="font-weight-bold">Audios</h3>
        </v-col>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <AudioList :audios="audios" />
      </v-expansion-panel-content>
    </v-expansion-panel>

    <div class="list-document">
      <div class="box-document" v-for="(document, key) of document" :key="key">
        <font-awesome-icon :icon="document.preview" style="font-size: 50px" color="#DDD" />
        <a class="d-block black--text" :href="document.uri" target="_blank">Descargar documento</a>
      </div>
    </div>

    <!-- <v-expansion-panel
      elevation="0"
      v-if="(file = multimedia && multimedia.find(e => e.type === 3 || e.type === 5))"
      v-on:click="callListByType(3)"
    >
      <v-expansion-panel-header class="secondary">
        <v-col class="audio-list-icon">
          <img src="~assets/pdf.svg" width="32" />
        </v-col>
        <v-col>
          <h3 class="font-weight-bold">Documentos</h3>
        </v-col>
      </v-expansion-panel-header>

      <v-expansion-panel-content>
        <FileList :files="files" />
      </v-expansion-panel-content>
    </v-expansion-panel>-->
  </v-expansion-panels>
</template>
<script>
import { filterByType } from "@/utils/multimedia/multimedia";
import AudioList from "@/components/detail-product/AudioList";
import FileList from "@/components/detail-product/FileList";

export default {
  name: "Multimedia",
  props: ["product"],
  components: {
    AudioList,
    FileList
  },
  data() {
    return {
      multimedia: this.product.data.multimedia,
      audios: [],
      files: []
    };
  },

  computed: {
    checkDocument() {
      for (let m of this.multimedia) {
        if (m.type == 3 || m.type == 4 || m.type == 5) {
          return true;
        }
      }
      return false;
    },

    document() {
      if (this.checkDocument) {
        for (let d of this.multimedia) {
          if (d.type == 5) d.preview = "file-excel";
          if (d.type == 4) d.preview = "file-word";
          if (d.type == 3) d.preview = "file-pdf";
        }

        return this.multimedia.filter(e => e.preview != undefined);
      }
    }
  },
  methods: {
    callListByType(query) {
      if (this.multimedia) {
        if (query === 2) {
          this.audios = filterByType(this.multimedia, query);
        } else if (query === 3) {
          this.files = filterByType(this.multimedia, query);
        }
      } else {
        console.log("Empty");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.audio-list-icon {
  width: 50px;
}

.v-expansion-panel::before {
  box-shadow: none;
}

.v-expansion-panel button {
  border-radius: 50px;
  margin: 0.5% 0;
  padding: 1.5%;
}

.theme--light.v-expansion-panels .v-expansion-panel {
  background-color: transparent;
}

.v-expansion-panels:not(.v-expansion-panels--accordion)
  > .v-expansion-panel--next-active
  .v-expansion-panel-header {
  border-bottom-left-radius: none;
  border-bottom-right-radius: none;
}

.v-expansion-panel:not(:first-child)::after {
  border-top: none;
}

.list-document {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .box-document {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
