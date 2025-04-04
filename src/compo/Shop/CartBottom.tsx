import { cartType, fetchtype } from "@/types/interface";
import CheckOutPage from "./CheckOutPage";


export default function CartBottom({ data }: { data?: fetchtype }) {

    const calculateTotalPrice = (item: cartType) => {
        return Number(item.price) * item.quantity
    }

    // cart subtotal
    const cartSubtotal = data?.user?.produtcs?.reduce((total, item) => {
        return total + calculateTotalPrice(item);
    }, 0);


    // order total

    const orderTotal = cartSubtotal || 0;


    return (
        <div className='cart-bottom'>
            {/* check-box */}
            <div className='cart-checkout-box'>
                <form className='coupon'>
                    <input type="text" className='cart-page-input-text' name='coupon' id='coupon' placeholder='Coupon Code....' />
                    <input type="submit" value="Apply Coupon" />
                </form>


            </div>

            {/* shopping box */}

            <div className='shiping-box'>
                <div className='row'>
                    <div className='col-md-6 col-12'>
                        <div className='calculate-shiping'>
                            <h3>Calculate Shiping</h3>
                            <div className='outline-select'>
                                <input type="text" name="postalcode" id="address" placeholder='Address*' />

                            </div>
                            <div className='outline-select'>
                                <input type="text" name="postalcode" id="city" placeholder='City*' />
                            </div>

                            <div className='outline-select shipping-select'>
                                <input type="text" name="postalcode" id="country" placeholder='Country*' />

                            </div>
                            <input type="text" name="postalcode" id="postlcode" placeholder='Postocode/ZIP*' className='cart-page-input-text' />
                            <button type='submit'>Update Address</button>
                        </div>
                    </div>
                    {/* right side */}

                    <div className='col-md-6 col-12'>
                        <div className='cart-overview'>
                            <h3>Cart Totals</h3>
                            <ul className='lab-ul'>
                                <li>
                                    <span className='pull-left'>Cart Subtotal</span>
                                    <p className='pull-right'>₹{cartSubtotal}</p>
                                </li>
                                <li>
                                    <span className='pull-left'>Shipping And Handling</span>
                                    <p className='pull-right'>Free Shipping</p>
                                </li>
                                <li>
                                    <span className='pull-left'>Order Total</span>
                                    <p className='pull-right'>₹{orderTotal.toFixed(2)}</p>
                                </li>
                            </ul>


                            <form className='cart-checkout'>
                              
                                <div>
                                    <CheckOutPage data={data} orderTotal={orderTotal} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
