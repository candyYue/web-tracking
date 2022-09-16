import * as THREE from 'three';
class threeHelp{
    constructor(){
        this.gridHelper = new THREE.GridHelper( 10, 10 );
        this.gridHelper.position.y = -1
    }
}

export default new threeHelp()