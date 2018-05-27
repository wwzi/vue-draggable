/**
 * Create by WayenZhong at 2018-05-17
 * 简单拖拽的vue自定义指令
 */

/**
 * 初始化state
 * @param  {HTMLElement} el 绑定拖拽的元素，获取元素位置
 */
function initState(el) {
    var rect = el.getBoundingClientRect();
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;

    var state = {
        startPos: {
            x: 0,
            y: 0
        },
        mousePos: {
            x: 0,
            y: 0
        },
        lastPos: {
            x: 0,
            y: 0
        },
        initRect: {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
            bottom: rect.bottom + scrollTop,
            right: rect.right + scrollLeft
        }
    };

    setState(el, state);
}

/**
 * 设置元素的dataset
 * @param {HTMLDocument} el 设置dataset的元素
 * @param {Object} state 初始化或更新el dataset的对象
 */
function setState(el, state) {
    state && el.setAttribute('data-draggable', JSON.stringify(state));
}

/**
 * 获取元素的dataset
 * @param  {HTMLDocument} el 用去改元素上绑定的dataset
 * @return {Object}    绑定在元素el上的数据对象
 */
function getState(el) {
    return JSON.parse(el.getAttribute('data-draggable'));
}

/**
 * 通知用户当前触发了那些事件（mouse down/move/up）
 * @param  {String}         binding     [description]
 * @param  {String}         type        事件类型(mouseDown/mouseMove/mouseUp)
 * @param  {HTMLDocument}   el         当前正在触发事件的元素
 * @param  {Object}         mousePos    鼠标当前的坐标(mousePos.x/mousePos.y)
 */
function onPosChange(binding, type, el, mousePos) {
    binding.value && binding.value.onPosChange && binding.value.onPosChange(type, el, mousePos);
}

var draggable = {
    install(Vue, options) {
        Vue.directive('draggable', draggable);
    },
    bind(el, binding) {
        var copyEl = el;

        el.addEventListener('mousedown', mouseDown);
        el.mouseDownEvent = mouseDown;
        if (binding.value && binding.value.clone) {
            el.style.position = 'absolute';
        }

        initState(el);

        function mouseDown(event) {
            if (binding.value && binding.value.clone) {
                el = el.cloneNode(true);
                el.style.top = copyEl.offsetTop + 'px';
                el.style.left = copyEl.offsetLeft + 'px';
                el.style.position = 'absolute';
                copyEl.parentNode.appendChild(el);
            }

            var state = getState(el);

            state.startPos = state.lastPos;
            state.mousePos = {
                x: event.clientX,
                y: event.clientY
            };
            el.style.zIndex = 2001;

            var scrollTop = document.documentElement.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft;
            var react = el.getBoundingClientRect();

            state.momentRect = {
                top: react.top + scrollTop,
                left: react.left + scrollLeft,
                bottom: react.bottom + scrollTop,
                right: react.right + scrollLeft,
                width: react.width,
                height: react.height
            };
            setState(el, state);
            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);

            onPosChange(binding, 'mouseDown', el, state.mousePos);
        }

        function mouseMove(event) {
            event.preventDefault();
            var state = getState(el);

            const dx = event.clientX - state.mousePos.x;
            const dy = event.clientY - state.mousePos.y;

            var boundingRect = binding.value && binding.value.boundingRect;

            if (boundingRect) {
                // 左
                if (state.momentRect.top + dy > boundingRect.top && state.momentRect.bottom + dy < boundingRect.bottom) {
                    console.log(1);
                    state.lastPos.y = state.startPos.y + dy;
                }
                else if (state.momentRect.top + dy <= boundingRect.top) {
                    console.log(2);
                    state.lastPos.y = boundingRect.top - state.initRect.top;
                }
                else if (state.momentRect.bottom + dy >= boundingRect.bottom) {
                    console.log(3);
                    state.lastPos.y = boundingRect.bottom - state.initRect.bottom;
                }

                // 右
                if (state.momentRect.left + dx > boundingRect.left && state.momentRect.right + dx < boundingRect.right) {
                    state.lastPos.x = state.startPos.x + dx;
                }
                else if (state.momentRect.left + dx <= boundingRect.left) {
                    state.lastPos.x = boundingRect.left - state.initRect.left;
                }
                else if (state.momentRect.right + dx >= boundingRect.right) {
                    state.lastPos.x = boundingRect.right - state.initRect.right;
                }
            }
            else {
                state.lastPos.x = state.startPos.x + dx;
                state.lastPos.y = state.startPos.y + dy;
            }

            el.style.transform = `translate(${state.lastPos.x}px, ${state.lastPos.y}px)`;
            setState(el, state);
            onPosChange(binding, 'mouseMove', el, state.lastPos);
        }

        function mouseUp(event) {
            var state = getState(el);
            document.removeEventListener("mousemove", mouseMove);
            document.removeEventListener("mouseup", mouseUp);
            el.style.zIndex = 1;
            onPosChange(binding, 'mouseUp', el, state.lastPos);
            binding.value && binding.value.clone && el.parentNode.removeChild(el);
            el = copyEl;
        }
    },
    unbind(el, binding) {
        el.removeEventListener('mousedown', el.mouseDownEvent);
    },
    inserted(el, binding) {
        var state = getState(el);
        if (!state || state.initRect.right === 0) {
            initState(el, binding);
        }
    }
};

module.exports = draggable;
