import React from 'react'
import { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

interface FaderProps { }
interface FaderState { value: number }

export class Fader extends Component<FaderProps, FaderState> {
    handleOnChange = (value: number) => {
        this.setState({
            value: value
        })
    }

    render() {
        let value = this.state && this.state.value
        return (
            <Slider
            value={value}
            orientation="vertical"
            onChange={this.handleOnChange}
            />
        )
    }
}