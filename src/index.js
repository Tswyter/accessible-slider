import './scss/styles.scss';
import Slider from './slider';

const sliders = [...document.getElementsByClassName('swyder')];

sliders.forEach(slider => {
  new Slider(slider);
});
