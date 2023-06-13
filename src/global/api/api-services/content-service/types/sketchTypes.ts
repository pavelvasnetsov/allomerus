interface Tag {
    id: string;
    name: string;
}

export interface Sketch {
    id: string;
    authorEmail: string;
    authorName: string;
    access: string;
    tags: Tag[];
    publicationDate: string;
    name: string;
    description: string;
    files: string[];
}

