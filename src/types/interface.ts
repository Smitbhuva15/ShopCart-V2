export interface fetchtype {
    user: {
        id: string
        firstName: string
        lastName: string
        email: string
        password: string

        itmes: {
            id: string
            category: string
            name: string
            seller: string
            price: number
            rating: number
            rating_count: number
            stock: number
            image: String
            userId: String
        }[]
        orders: {
            id: string
            amount: number
            username: string
            email: string
            itemName: string
            orderId: string
            image: string
            userId: string,
            productIds :string[]
        }[]
        produtcs: {
            id: string
            productId: string
            quantity: number
            coupon: string
            color: string
            size: string
            userId: string
            name: string
            img: string
            price: string
        }[]
    }
}

export interface cartType {

    id: string
    productId: string
    quantity: number
    coupon: string
    color: string
    size: string
    userId: string
    name: string
    img: string
    price: string

}