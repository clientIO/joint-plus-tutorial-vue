<template>
    <div class="canvas" ref="canvas"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { dia, ui, shapes } from '@clientio/rappid';

@Component({})
export default class App extends Vue {

    declare public $refs: {
        canvas: HTMLDivElement;
    }
    private graph: dia.Graph;
    private paper: dia.Paper;
    private scroller: ui.PaperScroller;

    public created(): void {
        const graph = this.graph = new dia.Graph({}, { cellNamespace: shapes });

        const paper = this.paper = new dia.Paper({
            model: graph,
            background: {
                color: '#F8F9FA',
            },
            frozen: true,
            async: true,
            sorting: dia.Paper.sorting.APPROX,
            cellViewNamespace: shapes
        });

        const scroller = this.scroller = new ui.PaperScroller({
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

        this.graph.addCell(rect);
    }

    public mounted(): void {
        const { scroller, paper, $refs : { canvas } } = this;
        canvas.appendChild(this.scroller.el);
        scroller.center();
        paper.unfreeze();
    }
}
</script>

<style lang="scss">
@import "~@clientio/rappid/rappid.css";

body {
    height: 100vh;
    box-sizing: border-box;
    margin: 0;

.canvas {
    width: 100%;
    height: 100%;

    .joint-paper {
        border: 1px solid #A0A0A0;
    }
 }
}
</style>
