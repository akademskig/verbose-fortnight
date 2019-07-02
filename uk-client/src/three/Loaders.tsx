import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { AssertionError } from 'assert';
import { AnimationClip, Scene, Camera } from 'three';

export default class ModelsLoaders {
    GLTFLoader!: GLTFLoader

    constructor() {
        this.getGLTFLoader()
    }

    getGLTFLoader = () => {
        let loader = new GLTFLoader();

        //Provide a DRACOLoader instance to decode compressed mesh data

        this.GLTFLoader = loader
    }
    /**
     * @param  {string} url
     * @param  {string} format
     * @param  {THREE.Scene} scene
     */
    _loadModel= async (url: string, format: string, scene: THREE.Scene):Promise<GLTFModel> => {
        console.log(url)
        let loader: any;
        switch (format) {
            case ("gltf"): {
                loader = this.GLTFLoader;
                break;
            }
            default: {
                loader = this.GLTFLoader;
            }
        }
        return new Promise((resolve:(gltf:GLTFModel)=>void, reject:(err:Error)=>void) => {
            return loader.load(
                // resource URL
                url,
                // called when the resource is loaded
                (gltf: GLTFModel) => {
                    return resolve(gltf)
                },
                null,
                (error: Error) => {
                    return reject(error)
                });
        })

    };
    public get loadModel() {
        return this._loadModel;
    }
    public set loadModel(value) {
        this._loadModel = value;
    }
}


type GLTFModel = {
    scene: any,
    animations: Array<AnimationClip>
    scenes: Scene,
    cameras: Camera,
    asset: any,
    parser: any
}

