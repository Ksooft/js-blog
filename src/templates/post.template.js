export function renderPost(post, options = {}) {
    const tag = post.type === 'news'
        ? '<li class="tag tag-blue tag-rounded">Новость</li>'
        : '<li class="tag tag-rounded">Заметка</li>'

    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const candidate = favorites.find(p => p.id === post.id)

    const buttonFavorite = candidate
        ? `<button class="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}" onclick="this.blur()">Удалить из избранного</button>`
        : `<button class="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}" onclick="this.blur()">Добавить в избранное</button>`
    const buttonDelete = `<button class="btn-del-post" data-id="${post.id}" onclick="this.blur()"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAhElEQVRIiWNgGOqAkRhFz31sGhgYGOrRdHZKbj5SQbIFz31s/hPrOmxAcssRFDOZKDGMbPDcx+Y/KT7Bp57mPiDKAnQXkuLDweGDUQtGLRi1gDLAQowi9CIYnY8PDIwPGBkYnv5nYJAmpchmZGB4ik0cuw/+/8/CpQGn4f//ZxGrfmgBAJb0K63m3ULbAAAAAElFTkSuQmCC"></button>`
    return `
        <div class="panel">
        <div class="panel-head">
            <p class="panel-title">${post.title}</p>
            ${options.deleteBtn ? buttonDelete : ''}
            <ul class="tags">
                ${tag}
            </ul>
        </div>
        <div class="panel-body">
            <p class="multi-line">${post.fulltext}</p>
        </div>
        <div class="panel-footer w-panel-footer">
            <small>${post.date}</small>
            ${options.withButton ? buttonFavorite : ''}
        </div>
        </div>
    `
}