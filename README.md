![image](https://raw.githubusercontent.com/WayenZhong/vue-draggable/master/icon.png)

# vue-draggable
a simple draggable directive of Vue
[Try this demo](https://wayenzhong.github.io/vue-draggable/dist/index.html)

# How to use
```
npm i vue-draggable-directive --save-dev
```
```
import Vue from 'vue'
import VueDraggable from 'vue-draggable-directive'

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
