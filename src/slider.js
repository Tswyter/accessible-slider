class Slider {
  constructor(slider, {
    slideClass = 'swyder__swide',
    slideContainerClass = 'swyder__swides',
    sliderContainerClass = 'swyder__container',
    showArrows = true,
    showIndicators = true,
    loop = true
  } = {}) {
    this.slider = slider;
    this.slideClass = slideClass;
    this.sliderContainerClass = sliderContainerClass;
    this.slideContainerClass = slideContainerClass;
    this.slides = [...this.slider.querySelectorAll(`.${slideClass}`)];
    this.numOfSlides = this.slides.length - 1;
    this.currentSlide = 0;
    this.nextSlide = 1;
    this.prevSlide = loop ? this.numOfSlides : null;

    this.loop = loop;

    if (!slider) {
      console.log('Please pass a slider object.');
    } else {
      this.createContainer();
      if (showArrows) this.createArrows();
      if (showIndicators) this.createIndicators();
    }
  }

  createContainer() {
    this.slider.innerHTML = `<div class="${this.sliderContainerClass}">${this.slider.innerHTML}</div>`;
    this.slideContainer = this.slider.querySelector(`.${this.slideContainerClass}`);
    this.sliderContainer = this.slider.querySelector(`.${this.sliderContainerClass}`);
  }

  createArrows() {
    const arrowContainer = document.createElement('div');
    arrowContainer.classList.add('swyder__arrows');

    const arrowConfig = [
      {
        type: 'prev',
        text: 'previous slide',
        icon: '',
        img: {
          src: 'source',
          alt: 'alt'
        }
      },
      {
        type: 'next',
        text: 'next slide',
        icon: ''
      }
    ];

    arrowConfig.forEach(item => {
      const arrow = document.createElement('div');
      arrow.classList.add(`swyder__${item.type}`);

      const arrowButton = document.createElement('button');
      arrowButton.classList.add(`swyder__${item.type}-button`);

      arrowButton.addEventListener('click', () => {
        if (item.type === 'next') {
          this.slide(this.nextSlide);
        } else {
          this.slide(this.prevSlide);
        }
      });

      arrow.append(arrowButton);

      if (item.img) {
        const arrowImg = document.createElement('img');
        arrowImg.src = item.img.src;
        arrowImg.alt = item.img.alt;

        arrowButton.append(arrowImg);
      }

      arrowContainer.append(arrow);
    });

    this.sliderContainer.append(arrowContainer);
  }

  createIndicators() {
    this.indicators = [];
    const indicatorContainer = document.createElement('ol');
    indicatorContainer.classList.add('swyder__indicators');

    this.slides.forEach((slide, i) => {
      const indicator = document.createElement('li');
      indicator.classList.add('swyder__indicator');
      indicator.dataset.slide = i;
      if (i === this.currentSlide) indicator.classList.add('active');

      const indicataorButton = document.createElement('button');
      indicataorButton.classList.add('swyder__indicator-button');

      // add A11Y stuff here


      indicataorButton.addEventListener('click', e => {
        this.indicators.forEach(ind => ind.classList.remove('active'));
        this.slide(indicator.dataset.slide);
        parseInt(indicator.dataset.slide) === this.currentSlide ? indicator.classList.add('active') : indicator.classList.remove('active');
      });

      indicator.append(indicataorButton);
      this.indicators.push(indicator);

      indicatorContainer.append(indicator);
    });

    this.sliderContainer.append(indicatorContainer);
  }

  calculateSlideOrder(slideNumber) {
    const current = parseInt(slideNumber);

    this.currentSlide = current;
    const onLastSlide = this.currentSlide === this.numOfSlides;
    const onFirstSlide = this.currentSlide === 0;

    if (onLastSlide) {
      this.nextSlide = this.loop ? 0 : null;
      this.prevSlide = current - 1;
    } else if (onFirstSlide) {
      this.nextSlide = current + 1;
      this.prevSlide = this.loop ? this.numOfSlides : null;
    } else {
      this.nextSlide = current + 1;
      this.prevSlide = current - 1;
    }
  }

  slide(slideNumber) {
    this.calculateSlideOrder(slideNumber);
    this.slideContainer.setAttribute('style',`transform: translateX(-${this.currentSlide}00%);`);
    this.indicators.forEach(indicator => {
      if (parseInt(indicator.dataset.slide) === slideNumber) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
}

export default Slider;