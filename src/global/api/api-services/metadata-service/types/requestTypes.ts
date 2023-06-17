export interface ReviewPayload {
    text: string;
    rating: string;
    files: string[];
}

export interface ReviewQueryParams {
    sketch: string[];
}
export interface LikeQueryParams {
    sketch: string[];
}

export interface CommentQueryParams {
    sketch: string[];
}

export interface CommentPayload {
    text: string;
}