<template>
    <div class="video-box">
        <img id="img" src="../assets/img-color.png" width="200" height="200"/>
        <canvas id="canvas" width="200" height="200" ref="canvas" class="tracking-contain"></canvas>
    </div>
</template>

<script setup>
import 'tracking/build/tracking-min';
import 'tracking/build/data/face-min';
import { onMounted} from 'vue';

const init = ()=>{
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    // 固定写法
    //颜色追踪
    var tracker = new window.tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
    console.log(tracker)
    // tracker.setInitialScale(4);
    // tracker.setStepSize(2);
    // tracker.setEdgesDensity(0.1);
    window.tracking.track('#img', tracker, { camera: true });

    tracker.on('track', (event)=> {
        // 检测出人脸 绘画人脸位置
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (event.data.length === 0) {
            console.log('No colors were detected in this frame.')
        } else {
            event.data.forEach(function(rect) {
                console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
                context.strokeStyle = '#0764B7';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = "#000";
                context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y+12);
                context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 20);
            });
        }
    });
}

onMounted(() => {
    init()
})
</script>

<style scoped>
    .video-box{
        position: relative;
    }
    .tracking-contain{
        position: absolute;
        left: 0;
        top: 0;
    }
</style>