import React from 'react';
import Scene1Renderer from "./Scene1Renderer"
import { async } from 'q';
import * as THREE from "three"
export default class Scene1 extends React.Component<ScenePropTypes> {
    propTypes: any
    scene1Ref: React.RefObject<HTMLDivElement>
    scene!: HTMLCanvasElement
    aspectRatio = 2.00
    constructor(props: any) {
        super(props)
        this.scene1Ref = React.createRef()
    }

    async componentDidMount() {
        window.addEventListener("resize", () => {
            this.props.onWindowResize(window.innerWidth)
        })
        this.loadScene()

    }
    loadScene = () => {
        this.scene = new Scene1Renderer().loadScene(
            {
                width: this.sceneWidth(window.innerWidth),
                height: this.sceneHeight(this.sceneWidth(window.innerWidth), this.aspectRatio),
                ref: this.scene1Ref,
                prevScene: this.scene instanceof HTMLCanvasElement ? this.scene : null
            })
    }
    sceneHeight = (width: number, aspectRatio: number) => {
        return width / this.aspectRatio
    }
    sceneWidth = (width: number) => {
        return width * 0.90
    }
    componentWillUnmount() {
        window.removeEventListener("resize", () => {
            this.props.onWindowResize(window.innerWidth)
        })
    }
    async componentWillReceiveProps(props: ScenePropTypes, newProps: ScenePropTypes) {
        if (props.width !== newProps.width) {
            this.loadScene()
        }
    }
    render() {
        return (
            <div ref={this.scene1Ref} className="scene-1">
            </div>
        );
    }

}

type ScenePropTypes = {
    width: number
    onWindowResize: (width: number) => void
}









