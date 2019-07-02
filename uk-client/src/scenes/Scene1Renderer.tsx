import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Loaders from "../three/Loaders"
import models from "../three/3dmodels.json"
const CUBE_COLOR = 0xCCF2FF
export default class Scene1Renderer {
    modelLoader: Loaders
    scene!: THREE.Scene
    camera!: THREE.PerspectiveCamera
    renderer!: THREE.WebGLRenderer
    cube!: THREE.Mesh
    controls!: OrbitControls
    constructor() {
        this.modelLoader = new Loaders()
    }
    loadScene = ({ width, height, ref, prevScene }: { width: number, height: number, ref: React.RefObject<HTMLElement>, prevScene: HTMLCanvasElement | null }) => {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(this.scene.position)
        this.scene.add(this.camera);
        this.renderer = new THREE.WebGLRenderer({
            alpha: true, // transparency
            antialias: true
        })
        this.renderer.setSize(width, height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        if (ref.current) {
            if (prevScene) {
                ref.current.removeChild(prevScene)
            }
            ref.current.appendChild(this.renderer.domElement)

        }
        this.addControls(this.camera, this.renderer.domElement)
        this.addDragon()
        this.renderer.render(this.scene, this.camera)
        return this.renderer.domElement
    }

    addControls = (camera: THREE.PerspectiveCamera, renderDomElement: HTMLCanvasElement) => {
        this.controls = new OrbitControls(camera, renderDomElement);
        this.controls.update();
        this.controls.enableKeys = true
        this.controls.enablePan = true
        this.controls.keys = {
            LEFT: 37, //left arrow
            UP: 40, // up arrow
            RIGHT: 39, // right arrow
            BOTTOM: 38 // down arrow
        }
        //set speed
        this.controls.zoomSpeed = 8
        this.controls.panSpeed = 8
    }
    animateCube = () => {
        requestAnimationFrame(this.animateCube);
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera)
    }

    animateDragon = () => {
        requestAnimationFrame(this.animateDragon);
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }

    addCube = ({ scene, camera }: { scene: THREE.Scene, camera: THREE.PerspectiveCamera }) => {
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshBasicMaterial({ color: CUBE_COLOR });
        this.cube = new THREE.Mesh(geometry, material);
        scene.add(this.cube);
        this.renderer.render(scene, camera)
        this.animateCube();
    }

    addDragon = async () => {
        let model = await this.modelLoader.loadModel(models.dragon, "gltf", this.scene)
        this.scene.add(model.scene);
        console.log(model.animations)
        this.camera.position.z = 80
        this.camera.position.y = 50;
        this.renderer.render(this.scene, this.camera)
        this.animateDragon()
    }
}
