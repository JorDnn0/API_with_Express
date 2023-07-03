export interface MarsPhoto {
    id: number;
    sol: number;
    camera: any;
    img_src: string;
    earth_date: string;
    rover: any;
}

export interface MarsPhotoResponse {
    photos: MarsPhoto[];
}

export interface RoversResponse {
    rovers: Rover[]
}

export interface Rover {
    id: number,
    name: string,
    rover_id: number,
    full_name: string,
}