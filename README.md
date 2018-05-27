![image](https://raw.githubusercontent.com/WayenZhong/vue-draggbale/master/icon.png)

# vue-draggbale
a simple draggable directive of Vue

# Home to use
```
npm i vue-simple-draggable --save-dev
```
```
import Vue from 'vue'
import VueDraggable from 'vue-simple-draggable'

Vue.use(VueDraggable)
```
```
// only draggable
<div v-draggable></div>
// clone
<div v-draggable="{clone: true}"></div>
// ...
```

# API(Directive Value)

key | type | value
---|---|---
clone | Boolean | true/false
boundingRect | Object | {top: x, right: x, bottom: x, left: x}
onPosChange | Function | Params:<br> type: String: moushDown/MouseMove/MouseUp<br>el: HTMLElement<br>pos: Object: {x: xx, y: yy}
