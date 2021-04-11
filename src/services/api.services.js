class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl
    }

    async createPost(post) {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'post',
                body: JSON.stringify(post)
            })
            return await useRequest(request)
        } catch (error) {
            alert('Какая-то ошибка, повторите попытку (ошибка в консоли)')
            console.error(error);
        }
    }

    async deletePost(id) {
        try {
            const request = new Request(`${this.url}/posts/${id}.json`, {
                method: 'DELETE',
            })
            return useRequest(request)
        } catch (error) {
            alert('Какая-то ошибка, повторите попытку (ошибка в консоли)')
            console.error(error);
        }
    }

    async fetchPosts() {
        try {
            const request = new Request(`${this.url}/posts.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch (error) {
            console.error(error);
        }
    }

    async fetchPostById(id) {
        try {
            const request = new Request(`${this.url}/posts/${id}.json`, {
                method: 'get'
            })
            return useRequest(request)
        } catch (error) {
            console.error(error);
        }
    }

}

async function useRequest(request) {
    const response = await fetch(request)
    return await response.json()
}

// export const apiService = new ApiService(your url database firebase) don't forget to uncomment