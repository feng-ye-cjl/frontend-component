const vColDrag = {
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    ths: null, el: null, data: null, title: null,
    mounted(el: any, binding: any) {
        vColDrag.el = el;
        // 获取所有tr
        const ths = el.getElementsByTagName('thead')[0].getElementsByTagName('th');
        // 把trs挂在到指令对象上
        vColDrag.ths = ths;
        // console.log(vColDrag.ths)
        // 保存表格数据
        const {titleData, formatData} = binding.value;
        vColDrag.title = titleData;
        vColDrag.data = formatData;

        // 初始化
        init()
    },
}

const init = () => {
    // 给表格中的tr添加拖拽属性和事件
    [...vColDrag.ths].map(th => mountedElementDrag(th));
    bindEvent()
}

function bindEvent() {
    // 拖拽移动事件
    vColDrag.el.addEventListener('dragover', handleDragOver, false);
    // 去除默认行为
    vColDrag.el.addEventListener('dragenter', (e: DragEvent) => e.preventDefault(), false);
    window.addEventListener('dragover', (e) => e.preventDefault(), false);
    window.addEventListener('dragenter', (e) => e.preventDefault(), false);
}

let dragIndex = -1;
let overIndex = -1;

const handleDragStart = (e: DragEvent) => {
    // 找到当前拖住的tr的index
    dragIndex = [...vColDrag.ths].findIndex(th => th === e.target);
    // console.log('dragstart', dragIndex)
}

const handleDragOver = (e) => {
    // 找到当前鼠标所在的tr的index
    overIndex = [...vColDrag.ths].findIndex(th => th === e.target);
    // console.log('dragover', overIndex)
}

const handleDragEnd = () => {
    if (dragIndex !== -1 && overIndex !== -1) {
        // 交换title
        let temp = vColDrag.title[dragIndex];
        vColDrag.title[dragIndex] = vColDrag.title[overIndex];
        vColDrag.title[overIndex] = temp;
        // 交换对应的data数据
        vColDrag.data.forEach((item: any) => {
            let temp = item[dragIndex];
            item[dragIndex] = item[overIndex];
            item[overIndex] = temp;
        })
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

export default vColDrag