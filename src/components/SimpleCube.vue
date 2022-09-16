<template>
    <div id="scene-div" ref="sceneDiv"></div>
</template>

<script setup>
import * as THREE from 'three';
import scene from './three/scene';
// import camera from './three/camera';
import light from './three/light';
import help from './three/help';
import renderer from './three/renderer';
// import controls from './three/control';
import animate from './three/animate';
import { onMounted } from 'vue';
var cube
const init = ()=>{

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
    cube = new THREE.Mesh( geometry, material );
    cube.position.set(0,0,0)
    scene.add( cube );

    scene.add( help.gridHelper );
    scene.add( light.AmbientLight)
    document.querySelector('#scene-div').appendChild(renderer.domElement)
    animate()
}

onMounted(()=>{
    init()
})
</script>

<style scoped>
</style>