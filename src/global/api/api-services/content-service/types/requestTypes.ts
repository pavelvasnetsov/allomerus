export interface UpdateSketchPayload {
    access: string;
    tags: string[];
    name: string;
    description: string;
    files: string[];
}

export interface CreateSketchPayload {
    access: string;
    tags: string[];
    name: string;
    description: string;
    files: string[];
}

export interface SketchesListQueryParams {
    page?: number;
    size?: number;
    sort?: string;
    tags?: string[];
    name?: string[];
}

export interface MeSketchesListQueryParams {
    page?: number;
    size?: number;
    sort?: string;
}

export interface CreateTagPayload {
    name: string;
}

export interface UpdateTagPayload {
    name: string;
}