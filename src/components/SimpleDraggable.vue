<template>
  <div class="simple-draggable">
    <span v-text="foucs" class="foucs"></span>
    <div v-draggable="{onPosChange}" class="draggable only">draggable</div>
    <div v-draggable="cloneNode" class="draggable clone">clone</div>
    <div class="frame">
      <div v-draggable="frameNode" class="draggable frame-node">draggable</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleDraggable',
  data() {
    return {
      cloneNode: {
        clone: true,
        onPosChange: this.onPosChange
      },
      frameNode: {
        boundingRect: {
          top: 300,
          left: 100,
          right: 1002,
          bottom: 802
        },
        onPosChange: this.onPosChange
      },
      state: {
        type: '',
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    onPosChange(type, el, pos) {
      this.state.type = type;
      this.state.el = el;
      this.state.x = pos.x;
      this.state.y = pos.y;
    }
  },
  computed: {
    foucs() {
      return this.state.type ?  `type: ${this.state.type}; x: ${this.state.x}; y: ${this.state.y}` : '';
    }
  }
}
</script>

<style lang="less">
.simple-draggable {
  .center {
    text-align: center;
  }
  .draggable {
    width: 100px;
    height: 100px;
    position: absolute;
    cursor: move;
  }
  .only {
    top: 100px;
    left: 100px;
    background-color: #41b883;
    color: #35495d;
  }
  .clone {
    top: 100px;
    right: 100px;
    background-color: #35495d;
    color: #41b883;
  }
  .frame {
    width: 900px;
    height: 500px;
    position: absolute;
    top: 300px;
    left: 100px;
    border: 1px #41b883 solid;
  }
  .frame-node {
    background-color: #35495d;
    top: 144px;
    left: 305px;
    color: #41b883;
  }
  .foucs {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #fff;
  }
}
</style>