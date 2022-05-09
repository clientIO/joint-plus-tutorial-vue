<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { dia, ui, shapes } from '@clientio/rappid';

const canvas = ref(null);
const graph = new dia.Graph({}, { cellNamespace: shapes })
const paper = new dia.Paper({
  model: graph,
  background: {
    color: '#F8F9FA',
  },
  frozen: true,
  async: true,
  cellViewNamespace: shapes
});

const scroller = new ui.PaperScroller({
  paper,
  autoResizePaper: true,
  contentOptions: {
    minWidth: 600,
    allowNegativeBottomRight: true,
    useModelGeometry: true,
    padding: 100
  },
  cursor: 'grab'
});

scroller.render().adjustPaper();

const rect1 = new shapes.standard.Rectangle({
  position: { x: 300, y: 300 }, 
  size: { width: 100, height: 50 },
  attrs: {
    label: {
      text: 'Hello'
    }
  }
});

const rect2 = rect1.clone().position(500, 300).attr('label/text', 'World');

const link = new shapes.standard.Link();
link.source(rect1).target(rect2);

graph.addCells([rect1, rect2, link]);

onMounted(() => {
  if (!canvas.value) return;
  (canvas.value as HTMLDivElement).appendChild(scroller.el);

  paper.on('blank:pointerdown', (evt) => {
    scroller.startPanning(evt);
  });

  scroller.center();
  paper.unfreeze();
});
</script>

<template>
  <div class="canvas" ref="canvas"></div>
</template>

<style lang="scss">
  @import "~@clientio/rappid/rappid.css";

  body {
  height: 100vh;
  box-sizing: border-box;
  margin: 0;

    #app {
      height: 100%;
    }

    .canvas {
      width: 100%;
      height: 100%;

      .joint-paper {
        border: 1px solid #A0A0A0;
      }
    }
  }
</style>
