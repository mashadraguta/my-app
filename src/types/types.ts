


export type UsersType = {
    name: string | null
    id: number
    photos: PhotosArrayType
    status: string | null
    followed: boolean | null
}

export type PhotosArrayType = {
    small: string
    large: string
}

export type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}


export type ProfileType = {
    userId?: number
    lookingForAJob?: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe?: string
    contacts: ProfileContactsType
    photos: PhotosType
}


export type PhotosType = {
    small: string | null
    large: string | null
}