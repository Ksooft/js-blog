import { Component } from '../core/component'
import { apiService } from '../services/api.services'
import { renderPost } from '../templates/post.template'

export class FavoriteComponent extends Component {
    constructor(id, { loader }) {
        super(id)
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this))
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        const html = renderFavorites(favorites)
        this.$el.insertAdjacentHTML('beforeEnd', html)
    }

    onHide() {
        this.$el.innerHTML = ''
    }
}

async function linkClickHandler(event) {
    event.preventDefault()
    let postId
    if (event.target.classList.contains('js-link')) {
        postId = event.target.dataset.id
        event.target.closest('li').classList.add('hide')
        !this.$el.querySelectorAll('.panel').length > 0 && this.loader.show()
        const post = await apiService.fetchPostById(postId)
        post.id = postId
        this.loader.hide()
        if (!this.$el.querySelectorAll('.panel').length > 0) {
            document.querySelector('#favorite').insertAdjacentHTML('afterBegin', renderPost(post, {withButton: true, deleteBtn: false}))
        } else {
            const favoritPanel = this.$el.querySelectorAll('.panel')
            favoritPanel[favoritPanel.length - 1].insertAdjacentHTML('afterend', renderPost(post, {withButton: true, deleteBtn: false}))
        }
    }
    if (event.target.localName === 'button') {
        event.target.parentNode.parentNode.remove()
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(p => p.id !== event.target.dataset.id)
        if (favorites.length === 0) {
            this.$el.insertAdjacentHTML('afterbegin', `<h1 class="center red h5">Вы ещё ничего не добавляли</h1>`)
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}

function renderFavorites(list) {
    if (list && list.length) {
        return `
        <ul>
            ${list.map(i => `<li><a href="#" class="js-link" data-id="${i.id}">${i.title}</a></li>`).join(' ')}
        </ul>
        `
    }

    return `<h1 class="center red h5">Вы ещё ничего не добавляли</h1>`
}