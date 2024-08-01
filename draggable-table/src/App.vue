<template>
  <div>
    <table border="1" style="width: 500px;height: 300px" v-row-drag="formatData" v-col-drag="{ titleData, formatData }">
      <thead>
      <tr>
        <th v-for="(item, index) in titleData" :key="index">{{ item }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in formatData" :key="index">
        <td v-for="(item1, index1) in item" :key="index1" class="handle">{{ item1[1] }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import vRowDrag from "./directives/vRowDrag";
import vColDrag from "./directives/vColDrag.ts";

// 表格数据
const userInfo = [
  {id: 1, name: '张三', age: 18, score: 90},
  {id: 2, name: '李四', age: 20, score: 85},
  {id: 3, name: '王五', age: 19, score: 95},
  {id: 4, name: '赵六', age: 22, score: 88},
  {id: 5, name: '孙七', age: 21, score: 92}
]

// 期望数据格式
/**
 * [
 *   [
 *     ["id", 1]，
 *     ["name", "张三"],
 *     ["age", 18],
 *     ["score", 90]
 *   ],
 *   [
 *     ["id", 2]，
 *     ["name", "李四"],
 *     ["age", 20],
 *     ["score", 85]
 *   ]
 *   ...
 * ]
 */
// 表格标题
const title = ['id', 'name', 'age', 'score'];
// 格式化数据
const format = (data: any) => {
  return data.map(item => {
    let arr = [];
    for (let key in item) {
      arr.push([key, item[key]]);
    }
    return arr;
  })
}
const formatData = ref(format(userInfo))
const titleData = ref(title)

</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid black;
}

.handle {
  cursor: move;
  /* 拖动时的动画效果 */
  animation: shake 0.2s ease;
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(5px);
  }
}
</style>
