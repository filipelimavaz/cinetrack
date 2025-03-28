const MovieCarouselItem = (props) => {
    return `
        <li class="movie-carousel_item" data-carousel="item" data-id="${props.id}">
            <a class="movie-carousel_link" href="/${props.slug}">
                <img class="movie-carousel_cover" src="${props.imageCover}" alt="${props.title}"/>
            </a>
        </li>
    `
}

export default MovieCarouselItem