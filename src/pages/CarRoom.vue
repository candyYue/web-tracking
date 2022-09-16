<template>
    <div id="scene-div" ref="sceneDiv"></div>
</template>

<script setup>
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from 'vue';
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

    light = new THREE.AmbientLight(0x0000ff)
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
const animate = ()=>{ 
    controls.update()
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

onMounted(()=>{
    init()
})
</script>

<style scoped>
</style>