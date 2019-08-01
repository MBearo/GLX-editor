<template>
  <div class="editor">
    <div>
      ssss
    </div>
    <iframe class="iframe" src="http://localhost:8080/page" frameborder="0"></iframe>
  </div>
</template>
<script>
import Drag from '@/components/Drag.js'
export default {
  props: {

  },

  components: {
    Drag
  },

  mixins: [ ],

  data () {
    return {

    }
  },

  computed: {

  },

  watch: {

  },

  created () {

  },

  mounted () {

  },

  methods: {

  }
}
</script>
<style scoped>
.editor{
  display: flex;
  height: 100%;
}
.iframe{
  height: 100%;
  width: 100%;
}
</style>
