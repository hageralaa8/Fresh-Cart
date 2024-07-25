import { IProduct } from "./iproduct"
export interface ICart {
    totalCartPrice: number
    _id: string
    cartOwner: string
    products: IProduct
    createdAt: string
    updatedaAt: string
    __v: number
}
