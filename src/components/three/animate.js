import renderer from './renderer';
import controls from './controls';
import scene from './scene';
import camera from './camera';
const animate = ()=>{ 
    controls.update()
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

export default animate