import * as THREE from 'three';
var width = window.innerWidth
var height = window.innerHeight
class threeRender{
    constructor(){
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setSize(width,height)
    }
}

export default new threeRender().renderer