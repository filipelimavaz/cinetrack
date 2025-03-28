const UserProfile = (props) => {
    return `
        <li class="user-menu_item" data-id="${props.id}">
            <div class="user-profile user-profile">
                <img class="user-profile_avatar" src="${props.avatar}" />
                <span class="user-profile_title">${props.name}</span>
            </div>
        </li>
    `
}

export default UserProfile