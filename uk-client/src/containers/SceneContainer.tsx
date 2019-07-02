import { connect } from 'react-redux'
import { resizeWindow } from '../redux/actions'
import Scene1 from '../scenes/scene1';

const mapStateToProps = (state:any) => {
  return {
    // @ts-ignore
    width: state.resizeWindow
  }
}

const mapDispatchToProps = (dispatch:any, ownProps:any) => {
  return {
    onWindowResize: (width:number) => {
      dispatch(resizeWindow(width))
    }
  }
}

const SceneContainer:any = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scene1)

export default SceneContainer