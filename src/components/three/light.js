import * as THREE from 'three';
class threeLight{
    constructor(){
        this.AmbientLight = new THREE.AmbientLight(0xffffff)
    }
}

export default new threeLight()