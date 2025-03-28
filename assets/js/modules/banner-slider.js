const bannerSliderModule = () => {
    const sliderItens = document.querySelectorAll('[data-banner="item"]')
    const slider = document.querySelector('[data-banner="slider"]')
    const btnNext = document.querySelector('[data-banner="btn-next"]')
    const btnPrevious = document.querySelector('[data-banner="btn-previous"]')
    const btnControls = document.querySelectorAll('[data-banner="btn-control"]')
    const imgTitles = document.querySelectorAll('[data-banner="img-title"]')

    const state = {
        mouseDownPosition: 0,
        movementPosition: 0,
        lastTranslatePosition: 0,
        currentSliderPosition: 0,
        currentSlideIndex: 0
    }

    function preventDefault(event) {
        event.preventDefault()
    }

    function translateSlide(position) {
        state.lastTranslatePosition = position
        slider.style.transform = `translateX(${position}px)`
    }

    function forwardSlide() {
        if(state.currentSlideIndex < sliderItens.length - 1) {
            setVisibleSlide(state.currentSlideIndex + 1)
        } else {
            setVisibleSlide(state.currentSlideIndex)
        }
    }

    function backwardSlide() {
        if(state.currentSlideIndex > 0) {
            setVisibleSlide(state.currentSlideIndex - 1)
        } else {
            setVisibleSlide(state.currentSlideIndex)
        }
    }

    function activeBtnControlButton(index) {
        btnControls.forEach(function(item) {
            item.classList.remove('active')
        })
        const btnControl = btnControls[index]
        btnControl.classList.add('active')
    }

    function activeImageTitle(index) {
        imgTitles.forEach(function(item) {
            item.classList.remove('active')
        })
        const imgTitle = imgTitles[index]
        imgTitle.classList.add('active')
    }

    function activeCurrentSlide() {
        sliderItens.forEach(function(slide, slideIndex){
            slide.classList.remove('active')
            if(slideIndex === state.currentSlideIndex) {
                slide.classList.add('active')
            }
        })
    }

    function setVisibleSlide(index) {
        state.currentSlideIndex = index
        slider.style.transition = 'transform 0.25s'
        const position = getCenterPosition(index)
        activeCurrentSlide()
        setArrowButtonsDisplay()
        translateSlide(position)
        activeBtnControlButton(index)
        activeImageTitle(index)
    }

    function getCenterPosition(index) {
        const slide = sliderItens[index]
        const margin = (document.body.clientWidth - slide.offsetWidth)/2
        const centerPosition = margin - (slide.offsetWidth * index)
        return centerPosition
    }

    function onMouseDown(event, index) {
        const slide = event.currentTarget
        state.currentSliderPosition = event.clientX - state.lastTranslatePosition
        state.mouseDownPosition = event.clientX
        state.currentSlideIndex = index
        slide.addEventListener('mousemove', onMouseMove)
    }

    function onMouseUp(event) {
        const slide = event.currentTarget
        const movimentQtd = event.type.includes('touch') ? 50 : 150
        if(state.movementPosition > movimentQtd){
            backwardSlide()
        } else if (state.movementPosition < -movimentQtd) {
            forwardSlide()
        } else {
            setVisibleSlide(state.currentSlideIndex)
        }
        slide.removeEventListener('mousemove', onMouseMove)
        state.movementPosition = 0
    }

    function onMouseLeave(event) {
        const slide = event.currentTarget
        slide.removeEventListener('mousemove', onMouseMove)
    }

    function onMouseMove(event) {
        state.movementPosition = event.clientX - state.mouseDownPosition
        translateSlide(event.clientX - state.currentSliderPosition)
    }

    function onControlButtonClick(index) {
        activeBtnControlButton(index)
        setVisibleSlide(index)
    }

    function onTouchStart(event, index) {
        const slide = event.currentTarget
        slide.addEventListener('touchmove', onTouchMove)
        event.clientX = event.touches[0].clientX
        onMouseDown(event, index)
    }

    function onTouchEnd(event) {
        const slide = event.currentTarget
        slide.removeEventListener('touchmove', onTouchMove)
        onMouseUp(event)
    }

    function onTouchMove(event) {
        event.clientX = event.touches[0].clientX
        onMouseMove(event)
    }

    function setArrowButtonsDisplay() {
        btnPrevious.style.display = state.currentSlideIndex === 0 ? 'none' : 'block'
        btnNext.style.display = state.currentSlideIndex === (sliderItens.length - 1) ? 'none' : 'block'
    }

    function setListeners(){
        btnNext.addEventListener('click', forwardSlide)
        btnPrevious.addEventListener('click', backwardSlide)
        sliderItens.forEach(function(slide, index) {
            const bannerLink = slide.querySelector('.banner-slider_link')
            bannerLink.addEventListener('click', preventDefault)
            bannerLink.addEventListener('dragstart', preventDefault)
            slide.addEventListener('mousedown', function(event) {
                onMouseDown(event, index)
            })
            slide.addEventListener('mouseup', onMouseUp) 
            slide.addEventListener('mouseleave', onMouseLeave)
            btnControls[index].addEventListener('click', function() {
                onControlButtonClick(index)
            })
            slide.addEventListener('touchstart', function(event) {
                onTouchStart(event, index)
            })
            slide.addEventListener('touchend', onTouchEnd)
        })
        let resizeTimeOut;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeOut)
            resizeTimeOut = setTimeout(function() {
                setVisibleSlide(state.currentSlideIndex)
            }, 1000)
        })
    }

    function init() {
        setVisibleSlide(0)
        setListeners()    
    }

    return {
        init
    }
}

export default bannerSliderModule