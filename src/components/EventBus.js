import Vue from 'vue'
const list = []
let index = 0
class EventBusConstructor extends Vue {
  constructor () {
    super({
      beforeCreate () {
        console.log('eventbus beforeCreate')
      },
      created () {
        console.log('eventbus create')
        this.$on('start', value => console.log('start', value))
        this.$on('drop', value => console.log('drop', value))
        this.$on('test', value => {
          console.log(this)
        })
      }
    })
    this.index = index
    index++
  }
}
export default EventBusConstructor
