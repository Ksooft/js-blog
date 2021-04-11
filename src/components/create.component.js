import { Component } from '../core/component'
import { Form } from '../core/form'
import { Validators } from '../core/validators'
import { apiService } from '../services/api.services'
import { progressBar } from '../templates/progressBar.template'

export class CreateComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this))
        this.$el.fulltext.addEventListener('input', changeValueLength.bind(this))

        this.form = new Form(this.$el, {
            title: [Validators.required, Validators.minLength(5, 15)],
            fulltext: [Validators.required, Validators.minLength(10, 300)]
        })
    }
}

async function submitHandler(event) {
    event.preventDefault()

    if (this.form.isValid()) {
        this.$el.insertAdjacentHTML('afterbegin', progressBar({add: true}))
        fadeInOut(this.$el.querySelector('.progress-post-wrapper'), 0.05)
        const formData = {
            type: this.$el.type.value,
            date: new Date().toLocaleDateString(),
            ...this.form.value()
        }
        this.form.clear()
        await apiService.createPost(formData)
    } else {
        console.warn('Form is invalid');
    }
}

function changeValueLength(e) {
    const value = e.target.value.trim().length
    this.$el.querySelector('.length-textarea').textContent = value
    if (value < 10 || value > 300) {
        this.$el.querySelector('.length-textarea').classList.add('red')
    } else {
        this.$el.querySelector('.length-textarea').classList.remove('red')
    }
}