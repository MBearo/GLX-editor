<script>
import { EventBus } from './EventBus'
let dragged = null
function handleDragStart (e) {
  e.target.style.opacity = '.5'
  dragged = e.target
  // 设置 ID
  // e.dataTransfer.setData('text/plain', 'aosidjfoajsd')
  e.dataTransfer.setData('text/plain', { a: 1 })
  console.log('DragStart', e.target.id)
}
function handleDrag (e) {
  console.log('Drag', e.target.id)
}
function handleDragEnd (e) {
  e.target.style.opacity = ''
  console.log('DragEnd', e.target.id)
}
function handleDragEnter (e) {
  e.dataTransfer.effectAllowed = 'move'
  e.preventDefault()
  e.target.style.backgroundColor = '#ccc'
  console.log('DragEnter', e.target.id)
}
function handleDragOver (e) {
  e.dataTransfer.dropEffect = 'move'
  e.preventDefault()
  // console.log('DragOver', e.target.id)
}
function handleDragLeave (e) {
  e.target.style.backgroundColor = ''
  console.log('DragLeave', e.target.id)
}
function handleDrop (e, index, slot) {
  e.preventDefault()
  // const sourceId = e.dataTransfer.getData('text/plain')
  // console.log(sourceId)
  const data = e.dataTransfer.getData('text/plain')
  console.log('-----', data)
  console.log([...arguments])
  // e.target.style.backgroundColor = ''
  // e.target.appendChild($('#' + sourceId))
  console.log('Drop', e.target.id)
}
function $ (element) {
  return document.querySelector(element)
}
function isTransitionName (name) {
  return ['transition-group', 'TransitionGroup'].includes(name)
}

function isTransition (slots) {
  if (!slots || slots.length !== 1) {
    return false
  }
  const [{ componentOptions }] = slots
  if (!componentOptions) {
    return false
  }
  return isTransitionName(componentOptions.tag)
}

const drag = {
  name: 'dnd',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: [Array, Object],
    element: {
      type: String,
      default: 'div'
    },
    tag: {
      type: String,
      default: null
    },
    clone: {
      type: Function,
      default: original => {
        return original
      }
    }
  },
  data () {
    return {
      list: [],
      dragged: null,
      index: -1
    }
  },
  computed: {
    rootContainer () {
      return this.$el
    }
  },
  created () {
    this.list = JSON.parse(JSON.stringify(this.value))
  },

  mounted () {
    console.log(this.rootContainer)
    EventBus.$on('start', value => console.log('start', value))
    EventBus.$on('drop', value => console.log('drop', value))
  },
  render (h) {
    let contianer = {
      on: {
        // dragenter: handleDragEnter,
        // drop: handleDrop,
        // dragover: handleDragOver,
        // dragleave: handleDragLeave
      }
    }
    // draggable
    let slots = this.$slots.default

    console.log(slots)
    let newSlots = slots.map((slot, index) => {
      return {
        ...slot,
        data: {
          ...slot.data,
          attrs: {
            ...slot.data.attrs,
            draggable: true
          },
          on: {
            ...slot.data.on,
            dragstart: e => this.handleDragStart(e, index, slot),
            dragend: handleDragEnd,
            dragenter: handleDragEnter,
            drop: e => this.handleDrop(e, index, slot),
            dragover: handleDragOver,
            dragleave: handleDragLeave
          }
        }
      }
    })
    return h('div', contianer, newSlots)
  },
  methods: {
    getTag () {
      return this.tag || this.element
    },
    handleDragStart (e, index, slot) {
      // e.dataTransfer.effectAllowed = 'copy'
      console.log('dragStart', index)
      console.log(this.list)
      EventBus.$emit('start', this.list[index])
      this.index = index
      e.target.style.opacity = '.5'
      this.dragged = e.target
      // 设置 ID
      // e.dataTransfer.setData('text/plain', index)
      // console.log(e.dataTransfer.getData('text/plain'))
      /**
       * @todo 这么设置的话就只能传json
       */
      e.dataTransfer.setData('text/plain', JSON.stringify({ a: 1 }))
      console.log('DragStart', e.target.id)
    },
    handleDrop (e, index, slot) {
      EventBus.$emit('drop', this.list[index])
      console.log('drop', index)
      e.preventDefault()
      const sourceId = e.dataTransfer.getData('text/plain')
      // this.list.splice(this.index, 1, ...this.list.splice(index, 1, this.list[this.index]))
      // 原生的方法传index
      // this.list.splice(sourceId, 1, ...this.list.splice(index, 1, this.list[sourceId]))
      // this.$emit('valueChange', this.list)
      console.log(this.list)
      // console.log('---------', sourceId)
      console.log([...arguments])
      console.log(this)
      // e.target.style.backgroundColor = ''
      // e.target.appendChild($('#' + sourceId))
      console.log('Drop', e.target.id)
    }
  }
}
export default drag
</script>
<style scoped>
</style>
