import UserProfile from '../components/user-profile.js'
import BannerSliderItem from '../components/banner-slider-item.js'
import ControlSliderItem from '../components/control-slider-item.js'
import Collection from '../components/collection.js'
import MovieCarrouselItem from '../components/movie-carousel-item.js'
import bannerSliderModule from '../modules/banner-slider.js'
import collectionsModule from '../modules/collections.js'
import headerModule from '../modules/header.js'

const Home = (data) => {
    const userProfilesElement = document.querySelector('[data-usermenu="user-profiles"]')
    const controlsSliderElement = document.querySelector('[data-banner="controls-slider"]')
    const bannerSliderElement = document.querySelector('[data-banner="slider"]')
    const collectionsElement = document.querySelector('[data-carousel="collections"]')
    const { banners, categories, movies, userProfiles } = data

    if (userProfilesElement != null) {
        for (const item of userProfiles) {
            userProfilesElement.innerHTML += UserProfile(item)
        }
    }

    if (bannerSliderElement != null) {
        for (const banner of banners) {
            bannerSliderElement.innerHTML += BannerSliderItem(banner)
            controlsSliderElement.innerHTML += ControlSliderItem() 
        }
    }

    if (collectionsElement != null) {
        for (const category of categories) {
            collectionsElement.innerHTML += Collection(category)
            const collectionElement = document.querySelector(`[data-id="${category.id}"]`)
            const movieCarrouselListElement = collectionElement.querySelector('[data-carousel="list"]')
            const collectionMovies = movies.filter((movie) => movie.categories.includes(category.id))
            for (const movie of collectionMovies) {
                movieCarrouselListElement.innerHTML += MovieCarrouselItem(movie)
            }
        }
    }

    headerModule().init()
    
    const bannerSlider = bannerSliderModule();
    if (bannerSlider && typeof bannerSlider.init === 'function') {
        bannerSlider.init();
    }

    collectionsModule().init()
}

export default Home;