import { HeaderComponent } from './components/header.component'
import { NavigationComponent } from './components/navigation.component'
import { CreateComponent } from './components/create.component'
import { PostsComponent } from './components/posts.component'
import { FavoriteComponent } from './components/favorite.component'
import { LoaderComponent } from './components/loader.component'

window.fadeInOut = function (el, changeValue) {
    el.style.opacity = 0
    let opacity
    const changeIntervalIn = setInterval(function() {
        opacity = window.getComputedStyle(el).getPropertyValue('opacity')
        if (opacity >= 1 - changeValue) {
            clearInterval(changeIntervalIn)
            setTimeout(() => {
                const changeIntervalOut = setInterval(function() {
                    opacity = window.getComputedStyle(el).getPropertyValue('opacity')
                    if (opacity <= 0) {
                        clearInterval(changeIntervalOut)
                        el.remove()
                    }
                    el.style.opacity = parseFloat(opacity) - changeValue
                }, 15)
            }, 2000);

        }

        el.style.opacity = parseFloat(opacity) + changeValue
    }, 10)
}

window.addEventListener('load', () => {
    document.body.classList.remove('hide')
    document.body.removeAttribute('hide')
    new HeaderComponent('header')

    const navigation = new NavigationComponent('navigation')
    const loader = new LoaderComponent('loader')

    const create = new CreateComponent('create')
    const posts = new PostsComponent('posts', { loader })
    const favorite = new FavoriteComponent('favorite', { loader })

    navigation.registerTabs([
        {name: 'create', component: create},
        {name: 'posts', component: posts},
        {name: 'favorite', component: favorite},
    ])
})

