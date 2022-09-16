<template>
    <div id="scene-div" ref="sceneDiv"></div>
</template>

<script setup>
import * as THREE from 'three';
import scene from '../three/scene';
import light from '../three/light';
import help from '../three/help';
import renderer from '../three/renderer';
import animate from '../three/animate';
import { onMounted } from 'vue';

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'
var cube
const init = ()=>{

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.ShaderMaterial( {
        // color: 0x00ff00
        vertexShader:vertexShader,
        fragmentShader:fragmentShader
    } );
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