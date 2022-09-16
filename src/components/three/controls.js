import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import renderer from './renderer';
import camera from './camera';
class threeControl{
    constructor(){
        this.controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
    }
}

export default new threeControl().controls