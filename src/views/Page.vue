<template>
  <div class="page">
    <div>
      <Drag v-model="list" :option="{
        type:'copy',
        group:'aaa',
        put:false
      }">
        <component v-for="(item, index) in list" :key="index" :is="item.name"></component>
      </Drag>
      <draggable v-model="list"  group="people">
        <div class="a" v-for="(element,index ) in list" :key="index">{{element.name}}</div>
      </draggable>
    </div>
  </div>
</template>
<script>
import Drag from '@/components/Drag.js'
import A from '@/components/A'
import B from '@/components/B'
import C from '@/components/C'
import D from '@/components/D'
import draggable from 'vuedraggable'

export default {
  props: {},

  components: {
    Drag,
    A,
    B,
    C,
    D,
    draggable
  },

  mixins: [],

  data () {
    return {
      list: [
        {
          id: 1,
          name: 'A'
        },
        {
          id: 2,
          name: 'B'
        },
        {
          id: 3,
          name: 'C'
        },
        {
          id: 4,
          name: 'D'
        }
      ]
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  methods: {}
}
</script>
<style scoped>
.page {
  background-color: #f2f2f2;
  height: 100%;
}
</style>
