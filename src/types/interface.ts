export interface fetchtype {
    user: {
        id: string
        firstName: string
        lastName: string
        email: string
        password: string
        address: string | null
        Postocode: string | null
        city: string | null
        country: string | null

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
            image: string
            userId: string,
            products: string[]
            orderId: string
            createdAt: string

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