import React from 'react'


// <style>
//   @host {
//     * {
//       display: inline-block;
//     }
//   }
//   #knob {
//     cursor: pointer;
//     width: 64px;
//     height: 64px;
//     background-position-y: -64px;
//     position: relative;
//   }
//   #value-tip {
//     opacity: 0;
//     border: solid 1px #666;
//     background-color: #eee;
//     position: absolute;
//     top: 0;
//     right: 0;
//     padding: 1px 4px;
//     font-size: 10px;
//     font-family: Helvetica;
//     transition: opacity 0.3s;
//   }
// </style>


class Knob extends React.PureComponent {
  constructor(props) {
    super(props)
    const {
      value = 0,
      min = 0,
      max = 127,
      diameter = 64,
      step = 3,
      sprites = 30,
      src = 'img/MiniBrute.png',
      startPos = null,
      startVal = 0,
      mousedown = this.mousedownHandler
    } = this.props
    this.value = value
    this.min = min
    this.max = max
    this.diameter = diameter
    this.step = step
    this.sprites = sprites
    this.src = src
    this.startPos = startPos
    this.startVal = startVal
    this.mousedown = mousedown
    this.valueRef = React.createRef()
    this.knobRef = React.createRef()
    // this.mousedownBound = this.onClickHandlerBind.bind(this);
  }
  mousemove(e) {
    var offset = (this.startPos - e.pageY) || 0;
    var value = this.startVal + (e.shiftKey ? ~~(offset / 3) : this.step * offset);
    this.update.bind(this)(value);
  }

  cancel(e) {
    this.startPos = null;
    this.valueRef.current.style.opacity = 0;
    window.removeEventListener('mousemove', this.boundMousemove, true);
    window.removeEventListener('mouseup', this.boundCancel, true);
    // e.stopPropagation
    // this.fire('cancel');
  };

  update(value) {
    this.value = value < this.min ? this.min : value > this.max ? this.max : value;
    var range = this.max - this.min;
    var thisVal = '-' + ~~(this.sprites / range * (range - this.min + this.value) + 1) * this.diameter + 'px';
    if ('backgroundPositionY' in this.knobRef.current.style) {
      this.knobRef.current.style.backgroundPositionY = thisVal;
    } else {
      this.knobRef.current.style.backgroundPosition = "center " + thisVal;
    }
    // this.fire('change');
  };

  valueChanged(oldVal, newVal) {
    this.update.bind(this)(newVal);
  }

  mousedownHandler = (e) => {
    console.log(e, this)
    this.valueRef.current.style.opacity = 1;
    this.valueRef.current.style.opacity = 1;
    this.startPos = e.pageY;
    this.startVal = this.value;
    this.boundMousemove = this.mousemove.bind(this);
    this.boundCancel = this.cancel.bind(this);
    window.addEventListener('mousemove', this.boundMousemove, true);
    window.addEventListener('mouseup', this.boundCancel, true);
    e.preventDefault();
  }
  render() {
    const {
      value = 0,
      // min = 0,
      // max = 127,
      // diameter = 64,
      // step = 3,
      // sprites = 30,
      // src = 'img/org_amp.png',
      // startPos = null,
      // startVal = 0,
      mousedown = this.mousedownHandler
    } = this.props

    this.knobRef.current.style.width = this.diameter + 'px';
    this.knobRef.current.style.height = this.diameter + 'px';
    this.knobRef.current.style.background = 'url(' + this.src + ')';
    this.update.bind(this)(this.value);
    
    return <div className="knob" ref={this.knobRef} onMouseDown={mousedown}>
      <span ref={this.valueRef}>{value}</span>
    </div>
  }
}

export default Knob