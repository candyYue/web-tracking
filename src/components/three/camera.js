import * as THREE from 'three';
var width = window.innerWidth
var height = window.innerHeight
class threeCamera{
    constructor(){
        this.camera = new THREE.PerspectiveCamera(75,width/height,0.1,1000)
        this.camera.position.set(0,0,10)
        this.camera.lookAt(0,0,0)
    }
    
}

export default new threeCamera().camera