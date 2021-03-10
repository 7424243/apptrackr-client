import config from '../config'

const TokenService = {
    saveAuthToken(token) {
        window.sessionStorage.setItem(config.TOKEN_KEY, token)
    },
    getAuthToken() {
        return window.sessionStorage.getItem(config.TOKEN_KEY)
    },
    clearAuthToken() {
        window.sessionStorage.removeItem(config.TOKEN_KEY)
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken()
    },
    getUserIdFromToken() {
        const authToken = TokenService.getAuthToken()
        const bearerToken = authToken.slice(7, authToken.length)
        const base64URL = bearerToken.split('.')[1]
        let base64 = base64URL.replace('-', '+').replace('_', '/')
        //decode token in order to obtain user_id
        let decodedToken = JSON.parse(Buffer.from(base64, 'base64').toString('binary'))
        const user_id = decodedToken.user_id
        return user_id
    }
}

export default TokenService