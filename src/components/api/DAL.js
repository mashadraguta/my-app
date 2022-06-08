import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "a2ec01d2-5f96-4427-b1e7-501009c51c19"
    }
});


export const getUsersAPI = {


    getUsers(totalUserCount, pageSize) {

        return instance.get(`users?page=${totalUserCount}&count=${pageSize}`)
            .then(response => response.data)

    },


}

export const profileAPI = {
    getUsersStatus(userId) {

        return instance.get(`profile/status/${userId}`)

    },
    updateUsersStatus(userStatus) {

        return instance.put(`profile/status`, {
            status: userStatus
        })

    },
    getUsersProfile(userId) {
        return instance.get(`profile/${userId}`)


    },

    getFollow(id) {
        return instance.post(`follow/${id}`).then(response => response.data)

    },
    getUnFollow(id) {
        return instance.delete(`follow/${id}`).then(response => response.data)

    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`, formData,
            { headers: { "Content-Type": "multipart/form-data" } }).then(response => response.data)
    }
}



export const authAPI = {
    getAuthMe() {

        return instance.get('auth/me')

    },
    logIn(email, password) {
        return instance.post('auth/login', {
            email,
            password,
        })

    },
    logOut() {
        return instance.delete('auth/login')
    }
}


