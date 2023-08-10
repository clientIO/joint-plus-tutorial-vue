<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { dia, ui, shapes } from '@clientio/rappid';

const canvas = ref<Element | null>(null);

const graph = new dia.Graph();
const paper = new dia.Paper({
  model: graph,
  background: {
    color: '#F8F9FA'
  },
  frozen: true,
  async: true,
  sorting: dia.Paper.sorting.APPROX,
  cellViewNamespace: shapes
});

const scroller = new ui.PaperScroller({
  paper,
  autoResizePaper: true,
  cursor: 'grab'
});

scroller.render();

const rect = new shapes.standard.Rectangle({
  position: { x: 100, y: 100 },
  size: { width: 100, height: 50 },
  attrs: {
    label: {
      text: 'Hello World'
    }
  }
});

graph.addCell(rect);

onMounted(() => {
  canvas.value?.appendChild(scroller.el);
  scroller.center();
  paper.unfreeze();
});
</script>

<template>
  <div class="canvas" ref="canvas"></div>
</template>

<style scope>
.canvas {
  width: 100%;
  height: 100%;
}

.joint-paper {
  border: 1px solid #a0a0a0;
}
</style>
