export class Form {
    constructor(form, controls) {
        this.form = form
        this.controls = controls
    }

    value() {
        const value = {}

        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value
        })

        return value
    }

    clear() {
        Object.keys(this.controls).forEach(control => {
            this.form[control].value = ''
            this.form[control].placeholder = 'Очищено'
            clearPlaceholder(this.form)
        })
    }

    isValid() {
        let isFormValid = true
        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control]
            let isValid = true
            validators.forEach(validator => {
                isValid = validator(this.form[control].value) && isValid
            })
            isValid ? clearError(this.form[control]) : setError(this.form[control])
            isFormValid = isFormValid && isValid
        })

        return isFormValid
    }
}

function setError($control) {
    clearError($control)
    let error = ''
    if ($control.name === 'title') {
        if ($control.value.trim().length < 5) {
            error = '<p class="validation-error">Минимальное количество символов - 5</p>'
        }
        if ($control.value.trim().length > 15) {
            error = '<p class="validation-error">Максимальное количество символов - 15</p>'
        }
    } else if ($control.name === 'fulltext') {
        if ($control.value.trim().length < 10) {
            error = '<p class="validation-error">Минимальное количество символов - 10</p>'
        }
        if ($control.value.trim().length > 300) {
            error = '<p class="validation-error">Максимальное количество символов - 300</p>'
        }
    }
    $control.insertAdjacentHTML('afterend', error)
    document.querySelector('#create .length-textarea').style.bottom = 0
    $control.classList.add('invalid')
}

function clearError($control) {
    if ($control.name === 'fulltext') {
        document.querySelector('#create .length-textarea').style.bottom = 'auto'
    }
    if ($control.nextSibling) {
        $control.classList.remove('invalid')
        if ($control.nextSibling instanceof HTMLElement) {
            $control.closest('.form-control').removeChild($control.nextSibling)
        }    
    }
}

function clearPlaceholder($form) {
    $form.addEventListener('click', () => {
        $form['title'].placeholder = 'Введите название'
        $form['fulltext'].placeholder = 'Введите текст поста'
    })
}