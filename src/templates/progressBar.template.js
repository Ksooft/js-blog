export function progressBar(options = false) {
    const typeProgress = options.add ? 'Пост создан' : 'Пост удалён'
    return `
        <div class="progress-post-wrapper${options.add ? ' add' : ''}">
            <div class="progress-post">
                <span class="progress-post-text">${typeProgress}</span>
                <div class="progress-post-value"></div>
            </div>
        </div>
    `
}