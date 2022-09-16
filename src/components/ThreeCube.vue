<template>
    <div id="scene-div" ref="sceneDiv"></div>
</template>

<script setup>
import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from 'vue';
// import gsap from 'gsap'
var renderer
var scene
var camera
var cube
var light
var controls
var width = window.innerWidth
var height = window.innerHeight
const init = ()=>{
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75,width/height,0.1,1000)
    camera.position.set(0,0,10)
    camera.lookAt(0,0,0)

    
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
    cube = new THREE.Mesh( geometry, material );
    cube.position.set(0,0,0)
    scene.add( cube );

    const gridHelper = new THREE.GridHelper( 10, 10 );
    gridHelper.position.y = -1
    scene.add( gridHelper );

    light = new THREE.AmbientLight(0xffffff)
    scene.add(light)

    renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(width,height)
    document.querySelector('#scene-div').appendChild(renderer.domElement)
    controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
    animate()
}

var world
var bodyGround
var bodyBox
const initCannon=() =>{
    world = new CANNON.World({
        gravity:new CANNON.Vec3(0,-9.8,0)//设置物理世界的重力为沿y轴向上-9.8米每二次方秒
    });
    bodyGround = new CANNON.Body({ //创建一个刚体（物理世界的刚体数据）
        mass: 0, //刚体的质量，这里单位为kg
        position: new CANNON.Vec3(0, -1.5, 0), //刚体的位置，单位是米
        shape: new CANNON.Box(new CANNON.Vec3(20,0.1,20)), //刚体的形状（这里是立方体，立方体的参数是一个包含半长、半宽、半高的三维向量，具体我们以后会说）
        material: new CANNON.Material({friction: 0.05, restitution: 0}) //材质数据，里面规定了摩擦系数和弹性系数
    });
    world.addBody(bodyGround); //物理世界添加地面刚体
    
    bodyBox = new CANNON.Body({
        mass: 1,//质量
        position: new CANNON.Vec3(0, 10, 0),
        shape: new CANNON.Box(new CANNON.Vec3(1,1,1)),
        material: new CANNON.Material({friction: 0.1, restitution: 0})
    });
    world.addBody(bodyBox)
}

// const Clock = new THREE.Clock()
const animate = ()=>{ 
    // const deltatime = Clock.getDelta()
    world.fixedStep()
    // world.step(1/60,deltatime)
    cube.position.copy(bodyBox.position)
    controls.update()
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

const keywordAction = ()=>{
    document.addEventListener('keydown', function(e){
        const keyCode = e.keyCode
        if(keyCode===87){ //w
            bodyBox.position.z-=0.5
        }
        if(keyCode===83){ //s
            bodyBox.position.z+=0.5
        }
        if(keyCode===65){ //a
            bodyBox.position.x-=0.5
        }
        if(keyCode===68){//d
            bodyBox.position.x+=0.5
        }
    })
}
onMounted(()=>{
    initCannon()
    init()
    keywordAction()
})
</script>

<style scoped>
</style>