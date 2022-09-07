import { AxiosResponse } from 'axios'
import { instance, ResponseType } from "./DAL"
import { UsersType, ProfileType, PhotosArrayType } from '../../types/types'

type PhotosDataType = {
    photos: PhotosArrayType
}

type PromiseResponse = {
    resultCode: number
    messages: Array<string>
}


export type GetItemsType = {
    items: Array<UsersType>,
    totalCount: number,
    error: string | null,
}


export const profileAPI = {
    getUsersStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateUsersStatus(userStatus: string) {
        return instance.put(`profile/status`, {
            status: userStatus
        })
    },

    getUsersProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)

    },
    updateUserProfile(profile: ProfileType): Promise<AxiosResponse<PromiseResponse>> {
        return instance.put<ResponseType<ProfileType>>(`profile`, profile)

    },

    getFollow(id: number) {
        return instance.post(`follow/${id}`).then(response => response.data)

    },
    getUnFollow(id: number) {
        return instance.delete(`follow/${id}`).then(response => response.data)

    },
    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put<ResponseType<PhotosDataType>>(`profile/photo`, formData,
            { headers: { "Content-Type": "multipart/form-data" } })
            .then(response => response.data)
    }
}

export const getUsersAPI = {
    getUsers(currentPage = 1, pageSize: number) {

        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)

    },
}