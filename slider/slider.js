const items = [
  '/slider/images/pic-1.jpg',
  '/slider/images/pic-2.jpg',
  '/slider/images/pic-3.jpg',
  '/slider/images/pic-4.jpg',
  '/slider/images/pic-5.jpg',
  '/slider/images/pic-6.jpg',
  '/slider/images/pic-7.jpg',
  '/slider/images/pic-8.jpg',
  '/slider/images/pic-9.jpg',
  '/slider/images/pic-10.jpg',
]

const sliderTrack = document.querySelector('.slider__content__track')
const sliderDotsList = document.querySelector('.slider__dots')

const nextSlideBtn = document.querySelector('.slider-control-next')
const prevSlideBtn = document.querySelector('.slider-control-prev')

const isNumber = (value) => {
  return typeof value === 'number'
}

let index = 0
let targetIndex = null
let currentSlide = null

const sliderInitialization = () => {
  currentSlide = generateSlide(items, index)
  sliderTrack.append(currentSlide)
  generateDots()
}

nextSlideBtn.addEventListener('click', () => handleNextSlide())
prevSlideBtn.addEventListener('click', () => handlePrevSlide())

const generateSlide = (items, targetIndex) => {
  const div = document.createElement('div')
  div.classList.add('slider__content__track__item')
  div.style.backgroundImage = `url("${items[targetIndex]}")`

  return div
}

const getNextIndex = (targetIndex, items) => {
  if (targetIndex === items.length - 1) {
    targetIndex = 0
  } else {
    targetIndex++
  }
  return targetIndex
}

const getPrevIndex = (targetIndex, items) => {
  if (targetIndex === 0) {
    targetIndex = items.length - 1
  } else {
    targetIndex--
  }
  return targetIndex
}

const btnsDisable = () => {
  nextSlideBtn.classList.add('disabled')
  prevSlideBtn.classList.add('disabled')
  sliderDots.forEach((e) => {
    e.classList.add('disabled')
  })
}

const btnsActivation = () => {
  nextSlideBtn.classList.remove('disabled')
  prevSlideBtn.classList.remove('disabled')
  sliderDots.forEach((e) => {
    e.classList.remove('disabled')
  })
}

const sliderItemWidth = 440

const handleNextSlide = (targetIndex = null) => {
  let position = 0
  index = isNumber(targetIndex) ? targetIndex : getNextIndex(index, items)

  regenerateDots()

  let startTime = Date.now()
  const nextSlide = generateSlide(items, index)

  setTimeout(() => {
    sliderTrack.append(nextSlide)
  }, 0)

  let timer = setInterval(() => {
    let timePassed = Date.now() - startTime
    btnsDisable()

    if (timePassed < sliderItemWidth) {
      sliderTrack.style.transform = `translateX(${position - timePassed}px)`
    }

    if (timePassed > sliderItemWidth) {
      clearInterval(timer)
      position = -sliderItemWidth
      const prevSlide = currentSlide
      currentSlide = nextSlide

      setTimeout(() => {
        prevSlide.remove()
        sliderTrack.style.transform = `translateX(${0}px)`
        btnsActivation()
      }, 1)

      return
    }
  }, 0)
  clearTimeout()
}

const handlePrevSlide = (targetIndex = null) => {
  let position = -440
  index = isNumber(targetIndex) ? targetIndex : getPrevIndex(index, items)

  regenerateDots()

  let startTime = Date.now()
  const nextSlide = generateSlide(items, index)
  nextSlide.classList.add('next-slide')

  setTimeout(() => {
    sliderTrack.prepend(nextSlide)
  }, 0)

  let timer = setInterval(() => {
    let timePassed = Date.now() - startTime
    btnsDisable()

    if (timePassed < sliderItemWidth) {
      sliderTrack.style.transform = `translateX(${position + timePassed}px)`
      nextSlide.classList.remove('next-slide')
    }

    if (timePassed > sliderItemWidth) {
      clearInterval(timer)
      position = -sliderItemWidth
      const prevSlide = currentSlide
      currentSlide = nextSlide

      setTimeout(() => {
        prevSlide.remove()
        btnsActivation()
      }, 0)

      return
    }
  }, 0)
  clearTimeout()
}

const regenerateDots = () => {
  sliderDotsList.innerHTML = ''
  generateDots()
}

const generateDots = () => {
  items.forEach((_item, targetIndex) => {
    const dot = document.createElement('li')
    dot.classList.add('slider__dot')

    if (targetIndex === index) {
      dot.classList.add('active')
    }

    dot.addEventListener('click', () => {
      if (index > targetIndex) {
        handlePrevSlide(targetIndex)
      } else {
        handleNextSlide(targetIndex)
      }
    })
    sliderDotsList.append(dot)
  })
  return (sliderDots = document.querySelectorAll('.slider__dot'))
}

sliderInitialization()
