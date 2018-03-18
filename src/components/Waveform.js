import React, { Component } from 'react';

import { parseTime, getWaveformLength } from '../utils/helpers';

import {
  USER_Y,
  CUSTOMER_Y,
  HEIGHT,
  DIVIDER,
  FRAME_EQUALIZER,
  MARKER_START_Y,
  MARKER_END_Y
} from '../utils/constants';


class Waveform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      talkTimes: {},
      loadError: null,
      handleCanvasClick: null,
      handleResize: null,
    };

    this.reqListener = this.reqListener.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.getCtx = this.getCtx.bind(this);
    this.init = this.init.bind(this);
    this.draw = this.draw.bind(this);
    this.getCanvasWidth = this.getCanvasWidth.bind(this);
    this.setCanvasWidth = this.setCanvasWidth.bind(this);
    this.getMarkerXPosition = this.getMarkerXPosition.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    const { handleCanvasClick, handleResize } = this.state;

    this.canvas.removeEventListener('click', handleCanvasClick);
    window.removeEventListener('resize', handleResize);
  }

  componentDidUpdate() {

  }

  reqListener({ target }) {
    if (target.status !== 200) {
      return this.setState( () => ({ loadError: 'Could not load the data. Plese refresh the page.' }) );
    }

    const data = JSON.parse(target.response);
    const waveformLength = getWaveformLength(data.talkTimes);
    this.waveformLength = waveformLength;
    this.setState( () => ({ talkTimes: data.talkTimes }), this.init() );
  }

  fetchData() {

    // I'd much rather use fetch, but the requirement states to use XHR :)

    // fetch('https://rawgit.com/jiminny/join-the-team/master/assets/wavedata.json')
    //   .then( res => res.json() )
    //   .then( ({ talkTimes }) => {
    //     const waveformLength = getWaveformLength(talkTimes);
    //     this.waveformLength = waveformLength;
    //     this.setState( () => ({ talkTimes }), this.init() );
    //   })
    //   .catch( () => {
    //     this.setState( () => ({ loadError: 'Could not load the data. Plese refresh the page.' }) )
    //   });

    var req = new XMLHttpRequest();
    req.addEventListener('load', this.reqListener);
    req.open('get', 'https://rawgit.com/jiminny/join-the-team/master/assets/wavedata.json');
    req.send();
  }

  getCtx() {
    return this.canvas.getContext('2d');
  }

  init() {
    const { onCanvasClick } = this.props;

    const waveformLength = this.waveformLength;
    const draw = this.draw;
    const getCanvasWidth = this.getCanvasWidth;
    const setCanvasWidth = this.setCanvasWidth;
    const getMarkerXPosition = this.getMarkerXPosition;

    let canvasWidth = this.getCanvasWidth();
    let markerX = this.getMarkerXPosition(canvasWidth);

    let isPaused = false;
    let i = 0;
    let requestId;

    this.setCanvasWidth(canvasWidth);

    function animate() {
      requestId = requestAnimationFrame(animate);

      if (i < waveformLength / DIVIDER) {
        draw(i, markerX);

        i += DIVIDER / FRAME_EQUALIZER;
      } else {
        cancelAnimationFrame(requestId);
      }
    }


    function handleCanvasClick() {
      isPaused = !isPaused;

      if (isPaused) {
        cancelAnimationFrame(requestId);
      } else {
        requestAnimationFrame(animate);
      }

      onCanvasClick();
    }

    function handleResize() {
      const canvasWidth = getCanvasWidth();
      setCanvasWidth(canvasWidth);

      markerX = getMarkerXPosition(canvasWidth);
    }

    /* we set the handleResize and handleCanvasClick to the state,
    so that we can cancel these event listners in componentWillUnmount */
    this.canvas.addEventListener('click', handleCanvasClick);
    window.addEventListener('resize', handleResize);
    this.setState( () => ({ handleCanvasClick, handleResize }) );

    window.requestAnimationFrame(animate);
  }

  draw(i, markerX) {
    const { onTimeUpdate } = this.props;
    const { talkTimes } = this.state;
    const ctx = this.getCtx();

    // clear the canvas
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // draw the user waves
    ctx.fillStyle = 'rgb(253, 107, 176)';
    talkTimes.user.forEach(item => {
      const userX = item[0] / DIVIDER - i + markerX;
      const width = (item[1] - item[0]) / DIVIDER;
      return ctx.fillRect(userX, USER_Y, width, HEIGHT);
    });

    // draw the customer waves
    ctx.fillStyle = 'rgb(30, 35, 109)';
    talkTimes.customer.forEach(item => {
      const customerX = item[0] / DIVIDER - i + markerX;
      const width = (item[1] - item[0]) / DIVIDER;
      return ctx.fillRect(customerX, CUSTOMER_Y, width, HEIGHT);
    });

    // draw the marker line
    ctx.strokeStyle = 'rgb(222, 222, 222)';
    ctx.beginPath();
    ctx.moveTo(markerX, MARKER_START_Y);
    ctx.lineTo(markerX, MARKER_END_Y);
    ctx.closePath();
    ctx.stroke();

    // pass the elapsed time up to App.js
    const time = parseTime(Math.round(i * DIVIDER));
    onTimeUpdate(time);
  }

  getCanvasWidth() {
    // 0.2 is 10% margin left and right on the canvas
    return window.innerWidth - window.innerWidth * 0.2;
  }

  setCanvasWidth(width) {
    this.canvas.setAttribute('width', width);
  }

  getMarkerXPosition(canvasWidth) {
    return Math.round(canvasWidth / 2);
  }

  render() {
    const { onWaveFormMouseEnter, onWaveFormMouseLeave } = this.props;
    const { loadError } = this.state;

    return (
      <section className="waveform">
        <canvas
          height="120"
          ref={ canvas => this.canvas = canvas }
          onMouseEnter={ onWaveFormMouseEnter }
          onMouseLeave={ onWaveFormMouseLeave }
        >
          Canvas is not supported by your browser
        </canvas>
        <div>{ loadError }</div>
      </section>
    );
  }
}

export default Waveform;
