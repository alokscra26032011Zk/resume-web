<template>
  <div>
    <a  v-on:click="isDOCHidden = !isDOCHidden" class="nav-link active btn1" id="docLink" href="#">{{isDOCHidden ? 'Try File' : 'Try Image'}}</a>

    

    <p > {{isDOCHidden ? 'Image' : 'File'}} Selector: <file-select v-if="!isDOCHidden" v-model="file"></file-select>
    <image-select v-if="isDOCHidden" v-model="file"></image-select>
    
    </p>
    
    <p v-if="file">{{file.name}}</p>
  </div>
</template>

<script>
import FileSelect from './FileSelect.vue'
import ImageSelect from './ImageSelect.vue'

export default {
  components: {
    FileSelect,
    ImageSelect
  },

  data() {
    return {
      file: null,
      isDOCHidden: false
    }
  }
}
</script>
<style >
@import './assets/css/main.css';
</style>