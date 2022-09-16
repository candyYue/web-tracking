<template>
    <div class="video-box">
        <!-- <img id="img" src="../assets/img-color.png" width="200" height="200"/> -->
        <video id="video" width="320" height="240" preload autoplay loop muted ></video>
        <canvas id="canvas" width="320" height="240" ref="canvas" class="tracking-contain"></canvas>
        <button @click="openCamera">打开摄像头</button>
        <button @click="closeCamera">关闭摄像头</button>
    </div>
</template>

<script setup>
import 'tracking/build/tracking-min';
import 'tracking/build/data/face-min.js';
import 'tracking/build/data/eye-min.js';
import 'tracking/build/data/mouth-min.js';
import { onMounted} from 'vue';
 //颜色追踪
// var tracker = new window.tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
//物体追踪
// var tracker = new window.tracking.ObjectTracker(['face', 'eye', 'mouth']);
let medisState = null
let tracker = null
var trackerTask = null
const init = ()=>{
    tracker = new window.tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    trackerTask = window.tracking.track('#video', tracker);
}
const openCamera = ()=>{
    navigator.mediaDevices.getUserMedia({
        audio:false,
        video:{
            facingMode: "user"
        }
    }).then((stream)=>{
        medisState = stream
        const video = document.querySelector('#video')
        if('srcObject' in video){
            video.srcObject = stream
        }else{
            video.src = window.URL.createObjectURL(stream)
        }
        video.addEventListener('progress',()=>{
            handleTrack()
        })
    }).catch(()=>{
        console.log('error')
    })
}
// 关闭
const closeCamera = () =>{
      // 运行后返回数组，数组里面的值原型上有stop方法
    const arr = medisState.getTracks()
    arr[0].stop()
    trackerTask.stop()// 停止检测
}

const handleTrack = ()=>{
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    tracker.on('track', (event)=> {
        console.log(event)
    // 检测出人脸 绘画人脸位置
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
            context.strokeStyle = '#0764B7';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
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