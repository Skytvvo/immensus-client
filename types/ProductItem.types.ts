export interface ProductItem{
    id: string;
    name: string;
    description: string;
    price: number;
    picture: string;
    state: "ACTIVE" | "DELETED"
}