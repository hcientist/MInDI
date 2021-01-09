import React from 'react'
import { PureComponent } from 'react'
import {ReactComponent as KnobImg} from './knob.svg'


interface KnobProps {
  default?: number
  min?: number
  max?: number
}
interface KnobState { startY?: number, transformValue: number }

export default class Knob extends PureComponent<KnobProps, KnobState> {
  constructor(props:KnobProps) {
    super(props)
    this.state = {transformValue:0}
  }
  handleOnMouseDown = (ev: React.MouseEvent<SVGSVGElement,MouseEvent>) => {
    ev.preventDefault()
    this.setState({startY: ev.pageY})
    console.log('ev:', this.props.default, ev)
    const listener = (mv: MouseEvent) => {
      mv.preventDefault()
      console.log('mv:', this.props.default, mv, this.state.transformValue)
      let sY = this.state.startY ?? 0
      this.setState({transformValue: this.state.transformValue + sY - mv.pageY})
      this.setState({startY: mv.pageY})
    }
    // document.onmousemove = listener
    document.addEventListener('mousemove', listener)
    const upHandler:EventListener = (mu) => {
      mu.preventDefault()
      console.log('mu:', this.props.default, mu)
      document.removeEventListener('mousemove', listener)
      document.removeEventListener('mouseup', upHandler)
    }
    document.addEventListener('mouseup', upHandler)
  }
  handleOnFingerDown = (ev:React.TouchEvent) => {
    ev.preventDefault()
      this.setState({startY: ev.touches[0].pageY})
    console.log('tev:', this.props.default, ev)
    const listener = (tmv: TouchEvent) => {
      tmv.preventDefault()
      console.log('tmv:', this.props.default, tmv, this.state.transformValue)
      let sY = this.state.startY ?? 0
      this.setState({transformValue: this.state.transformValue + (sY - tmv.touches[0].pageY)})    
      this.setState({startY: tmv.touches[0].pageY})
    }
      
    document.addEventListener('touchmove', listener)
    const upHandler:EventListener = (tmu) => {
      tmu.preventDefault()
      console.log('tmu:', this.props.default, tmu)
      document.removeEventListener('touchmove', listener)
      document.removeEventListener('touchend', upHandler)
    }
    document.addEventListener('touchend', upHandler)
    // begin tracking mouse/touch move
    // add handler for mouseup/touchstop
  }

  render() {
    console.log(this.state)
    return <KnobImg transform={`rotate(${this.state.transformValue})`} onMouseDown={this.handleOnMouseDown} onTouchStart={this.handleOnFingerDown}/>
  }
}