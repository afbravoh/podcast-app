export interface IPodcast {
    feedUrl: string
    artworkUrl600: string
    collectionName: string
    collectionId: number
    artworkUrl30: string
    artistName: string
    collectionCensoredName: string
    releaseDate: string
}

export interface  IDetails {
    title: string[]
    description: string[]
    item: IEpisode[]
}

export interface IEpisode {
    title: string[]
    enclosure: IEnclosure[]
    "itunes:image": IImage[]
    "itunes:author": string[]
    "pubDate": string[]
    "itunes:duration": string[]
    "itunes:summary": string[]
}

interface IEnclosure {
    "$": {
        url: string
    }
}

interface IImage {
    "$": {
        href: string
    }
}