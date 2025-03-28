const collectionsModule = () => {
    const collections = document.querySelectorAll('[data-carousel="collection"]')
    const collectionData = []
    let currentCollectionIndex = 0
    let itensPerSlide = 5

    function preventDefault(event) {
        event.preventDefault()
    }

    function translateSlide(position) {
        const { state, carouselList } = collectionData[currentCollectionIndex]
        state.lastTranslatePosition = position
        carouselList.style.transform = `translateX(${position}px)`
    }

    function getCenterPosition(slideIndex) {
        const { state, carouselItens } = collectionData[currentCollectionIndex]
        const item = carouselItens[state.currentItemIndex]
        const itemWidth = item.offsetWidth
        const bodyWidth = document.body.clientWidth
        const slideWidth = itemWidth * itensPerSlide
        const margin = (bodyWidth - slideWidth)/2
        return margin - (slideWidth * slideIndex)
    }

    function getLastSlideIndex() {
        const { carouselItens } = collectionData[currentCollectionIndex]
        const lastItemIndex = carouselItens.length - 1
        return Math.floor(lastItemIndex / itensPerSlide)
    }

    function animateTransition(active) {
        const { carouselList } = collectionData[currentCollectionIndex]
        if(active) {
            carouselList.style.transition = 'transform 0.3s'
        } else {
            carouselList.style.removeProperty('transition')
        }
    }

    function activeCurrentItens() {
        const { carouselItens, state } = collectionData[currentCollectionIndex]
        carouselItens.forEach(function(item, itemIndex){
            item.classList.remove('active')
            const firstItemIndex = state.currentSlideIndex * itensPerSlide
            if(itemIndex >= firstItemIndex && itemIndex < firstItemIndex + itensPerSlide) {
                item.classList.add('active')
            }
        })
    }

    function setArrowButtonsDisplay() {
        const { btnPrevious, btnNext, state } = collectionData[currentCollectionIndex]
        btnPrevious.style.display = state.currentSlideIndex === 0 ? 'none' : 'block'
        btnNext.style.display = state.currentSlideIndex === getLastSlideIndex() ? 'none' : 'block'
    }

    function setVisibleSlide(slideIndex) {
        const { state } = collectionData[currentCollectionIndex]
        state.currentSlideIndex = slideIndex
        const centerPosition = getCenterPosition(slideIndex)
        setArrowButtonsDisplay()
        activeCurrentItens()
        animateTransition(true)
        translateSlide(centerPosition)
    }

    function backwardSlide() {
        const { state } = collectionData[currentCollectionIndex]
        if(state.currentSlideIndex > 0) {
            setVisibleSlide(state.currentSlideIndex - 1)
        } else {
            setVisibleSlide(state.currentSlideIndex)
        }
    }

    function forwardSlide() {
        const { state } = collectionData[currentCollectionIndex]
        const lastSlideIndex = getLastSlideIndex()
        if(state.currentSlideIndex < lastSlideIndex) {
            setVisibleSlide(state.currentSlideIndex + 1)
        } else {
            setVisibleSlide(state.currentSlideIndex)
        }
    }

    function onMouseDown(event, itemIndex) {
        const { state } = collectionData[currentCollectionIndex]
        const item = event.currentTarget
        state.currentItemIndex = itemIndex
        state.mouseDownPosition = event.clientX
        state.currentSlidePosition = event.clientX - state.lastTranslatePosition
        animateTransition(false)
        item.addEventListener('mousemove', onMouseMove)

    }

    function onMouseUp(event) {
        const { state } = collectionData[currentCollectionIndex]
        if(state.movement > 150){
            backwardSlide()
        } else if(state.movement < -150) {
            forwardSlide()
        } else {
            setVisibleSlide(state.currentSlideIndex)
        }
        const item = event.currentTarget
        item.removeEventListener('mousemove', onMouseMove)
        state.movement = 0
    }

    function onMouseMove(event) {
        const { state } = collectionData[currentCollectionIndex]
        state.movement = event.clientX - state.mouseDownPosition
        const position = event.clientX - state.currentSlidePosition
        translateSlide(position)
    }

    function onMouseLeave(event) {
        const item = event.currentTarget
        item.removeEventListener('mousemove', onMouseMove)

    }

    function onTouchStart(event, itemIndex) {
        const item = event.currentTarget
        item.addEventListener('touchmove', onTouchMove)
        event.clientX = event.touches[0].clientX
        onMouseDown(event, itemIndex)
    }

    function onTouchEnd(event) {
        const item = event.currentTarget
        item.removeEventListener('touchmove', onTouchMove)
        onMouseUp(event)
    }

    function onTouchMove(event) {
        event.clientX = event.touches[0].clientX
        onMouseMove(event)
    }

    function insertCollectionData(collection) {
        collectionData.push({ 
            carouselList: collection.querySelector('[data-carousel="list"]'),
            carouselItens: collection.querySelectorAll('[data-carousel="item"]'),
            btnPrevious: collection.querySelector('[data-carousel="btn-previous"]'),
            btnNext: collection.querySelector('[data-carousel="btn-next"]'),
            state: {
                mouseDownPosition: 0,
                movement: 0,
                lastTranslatePosition: 0,
                currentSlidePosition: 0,
                currentItemIndex: 0,
                currentSlideIndex: 0
            }      
        })
    }

    function setItensPerSlide() {
        if(document.body.clientWidth < 1080){
            itensPerSlide = 2
            return
        }
        itensPerSlide = 5
    }

    function setWindowResizeListener() {
        let resizeTimeOut;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeOut)
            resizeTimeOut = setTimeout(function() {
                setItensPerSlide()
                collections.forEach(function(_, collectionIndex){
                    currentCollectionIndex = collectionIndex
                    setVisibleSlide(0)
                })
            }, 1000)
        })
    }

    function setListeners(collectionIndex) {
        const data = collectionData[collectionIndex]
        data.btnNext.addEventListener('click', function() {
            currentCollectionIndex = collectionIndex
            forwardSlide()
        })
        data.btnPrevious.addEventListener('click', function() {
            currentCollectionIndex = collectionIndex
            backwardSlide()
        })
        data.carouselItens.forEach(function(item, itemIndex) {
            const link = item.querySelector('.movie-carousel_link')
            link.addEventListener('click', preventDefault)
            item.addEventListener('dragstart', preventDefault)
            item.addEventListener('mousedown', function(event) {
                currentCollectionIndex = collectionIndex
                onMouseDown(event, itemIndex)
            })
            item.addEventListener('mouseup', onMouseUp)
            item.addEventListener('mouseleave', onMouseLeave)
            item.addEventListener('touchstart', function(event) {
                currentCollectionIndex = collectionIndex
                onTouchStart(event, itemIndex)
            })
            item.addEventListener('touchend', onTouchEnd)
        })
    }

    function init() {
        setWindowResizeListener()
        setItensPerSlide()
        collections.forEach(function (collection, collectionIndex) {
            currentCollectionIndex = collectionIndex
            insertCollectionData(collection)
            setListeners(collectionIndex)
            setVisibleSlide(0)
        })
    }

    return {
        init
    }
}

export default collectionsModule