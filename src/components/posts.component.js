import { Component } from '../core/component'
import { apiService } from '../services/api.services'
import { TransformService } from '../services/transform.services'
import { renderPost } from '../templates/post.template'
import { progressBar } from '../templates/progressBar.template'

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        try {
            this.loader.show()
            const fbData = await apiService.fetchPosts()
            const posts = TransformService.fbObjectToArray(fbData)
            const HTML = posts.map(post => renderPost(post, { withButton: true, deleteBtn: true })).join(' ')
            this.loader.hide()
            this.$el.insertAdjacentHTML('afterbegin', HTML) 
        } catch (error) {
            this.loader.hide()
            setTimeout(() => {
                this.$el.innerHTML = `
                    <h1 class="h4 red center" style="margin: 0">Сохраненных постов не найдено!</h1> 
                    <small class="center" style="display: block; margin: 0;">Чтобы они появились создайте их во вкладке <b style="cursor: pointer;" onclick="document.querySelector('#navigation .tab[data-name=${'create'}]').click()">Создать</b></small>
                `
            }, 300);
        }
    }

    onHide() {
        this.$el.innerHTML = ''
        this.loader.hide()
    }
}


async function buttonHandler(event) {
    const $el = event.target
    const id = $el.dataset.id
    const title = $el.dataset.title
    if (id && title) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        const candidate = favorites.find(p => p.id === id)

        if (candidate) {
            // remove
            $el.textContent = 'Добавить в избранное'
            $el.classList.add('button-primary')
            $el.classList.remove('button-danger')
            favorites = favorites.filter(p => p.id !== id)
        } else {
            // add
            $el.textContent = 'Удалить из избранного'
            $el.classList.remove('button-primary')
            $el.classList.add('button-danger')
            favorites.push({id, title})
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
    } else if ($el.matches('.btn-del-post') || $el.matches('.btn-del-post img')) {
        if (!this.$el.querySelector('.progress-post-wrapper') ) {
            this.$el.insertAdjacentHTML('afterbegin', progressBar({add: false}))
            fadeInOut(this.$el.querySelector('.progress-post-wrapper') , 0.05)
        } else {
            this.$el.querySelector('.progress-post-wrapper').remove()
            this.$el.insertAdjacentHTML('afterbegin', progressBar({add: false}))
            fadeInOut(this.$el.querySelector('.progress-post-wrapper') , 0.05)
        }
        const postId = $el.matches('.btn-del-post') ? $el.dataset.id : $el.parentNode.dataset.id
        $el.matches('.btn-del-post') ? event.path[2].remove() : event.path[3].remove()
        if (this.$el.querySelectorAll('.panel').length < 1) {
            const html = `
                <h1 class="h4 red center" style="margin: 0">Сохраненных постов не найдено!</h1> 
                <small class="center" style="display: block; margin: 0;">Чтобы они появились создайте их во вкладке <b style="cursor: pointer;" onclick="document.querySelector('#navigation .tab[data-name=${'create'}]').click()">Создать</b></small>
            `
            this.$el.insertAdjacentHTML('beforeend', html) 
        }
        await apiService.deletePost(postId)
    }
}
