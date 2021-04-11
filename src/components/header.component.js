import {Component} from '../core/component'

export class HeaderComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        if (localStorage.getItem('visited')) {
            this.hide()
        } else {
            document.body.classList.add('start-header')
        }
        this.$el.querySelector('.js-header-start').addEventListener('click', buttonHandler.bind(this))
    }
}

function buttonHandler() {
    localStorage.setItem('visited', JSON.stringify(true))
    this.hide()
    document.body.classList.remove('start-header')
    document.body.removeAttribute('class')
}