const vRowDrag = {
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    trs: null, el: null, data: null,
    mounted(el: any, binding: any) {
        vRowDrag.el = el;
        // 获取所有tr
        const trs = el.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        const trs2 = el.querySelector('tbody').querySelectorAll('tr');
        // 把trs挂在到指令对象上
        vRowDrag.trs = trs2;
        // console.log(trs)
        // console.log(trs2)
        // 保存表格数据
        vRowDrag.data = binding.value

        // 初始化
        init()
    },
}

const init = () => {
    // 给表格中的tr添加拖拽属性和事件
    [...vRowDrag.trs].map(tr => mountedElementDrag(tr));
    bindEvent()
}

function bindEvent() {
    // 拖拽移动事件
    vRowDrag.el.addEventListener('dragover', handleDragOver, false);
    // 去除默认行为
    vRowDrag.el.addEventListener('dragenter', (e: DragEvent) => e.preventDefault(), false);
    window.addEventListener('dragover', (e) => e.preventDefault(), false);
    window.addEventListener('dragenter', (e) => e.preventDefault(), false);
}

let dragIndex = -1;
let overIndex = -1;

const handleDragStart = (e: DragEvent) => {
    // 找到当前拖住的tr的index
    dragIndex = [...vRowDrag.trs].findIndex(tr => tr === e.target);
    // console.log('dragstart', dragIndex)
}

const handleDragOver = (e) => {
    // 找到当前鼠标所在的tr的index，此时移动的是td，所以需要找到其父元素tr
    overIndex = [...vRowDrag.trs].findIndex(tr => tr === e.target.parentNode);
    // console.log('dragover', overIndex)
}

const handleDragEnd = () => {
    if (dragIndex !== -1 && overIndex !== -1) {
        // 交换位置
        let temp = vRowDrag.data[dragIndex];
        vRowDrag.data[dragIndex] = vRowDrag.data[overIndex];
        vRowDrag.data[overIndex] = temp;
    }
}

/**
 * 添加拖拽事件
 * @param tr
 */
const mountedElementDrag = (tr: any) => {
    tr.draggable = true;
    tr.addEventListener('dragstart', handleDragStart, false);
    tr.addEventListener('dragend', handleDragEnd, false);
};

export default vRowDrag