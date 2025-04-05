import { cartType, fetchtype } from "@/types/interface";
import CheckOutPage from "./CheckOutPage";
import toast, { Toaster } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, SubmitHandler } from "react-hook-form"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


type Inputs = {
    address: string;
    city: string;
    Postocode: string;
    country: string;

};


const schema = yup
    .object()
    .shape({
        address: yup.string().min(3, "address must be at least 10 characters").required(),
        city: yup.string().min(3, " city must be at least 3 characters").required("Contact Number is require"),
        Postocode: yup.string().min(5, "Postcode must be at least 5 characters").required(" Postcode must be required"),
        country: yup.string().min(3, "country must be at least 3 characters").required()

    })
    .required();

export default function CartBottom({ data }: { data?: fetchtype }) {

     const {data:session}=useSession();
     
     const router=useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });


    const handleFormError = () => {
        Object.values(errors).forEach((error) => {
            const fieldError = error?.message as string;
            if (fieldError) {
                toast.error(fieldError);
            }
        });
    };


    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
             const newdata={
                userId:session?.user?.id,
                ...data
             }
        try {
            const res = await fetch("/api/address", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newdata),
            });

            if (res.ok) {
                const message = await res.json();
                reset()
                toast.success(message.message)
               window.location.replace("/cart-page")          
            
                
            }
            else{
                const errmessage = await res.json();
                toast.error(errmessage.message)
                router.replace('/cart-page')
            }
        } catch (error) {
            console.log(error, "error found");
        }
    };
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
                            <form className='contact-form' onSubmit={handleSubmit(onSubmit, handleFormError)}>

                                <input type="text" id="address" placeholder='Address* ' className="mb-3" defaultValue={data?.user?.address || ""} {...register("address")} />



                                <input type="text" id="city" placeholder='City*' className="mb-3" defaultValue={data?.user?.city || ""}  {...register("city")} />



                                <input type="text" id="country" placeholder='Country*' className="mb-3" defaultValue={data?.user?.country|| ""} {...register("country")} />


                                <input type="text" id="Postocode" placeholder='Postcode/ZIP*' className="mb-3" defaultValue={data?.user?.Postocode || ""} {...register("Postocode")} />

                                <button type='submit'>Update Address</button>
                            </form>
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
                                    <CheckOutPage data1={data} orderTotal={orderTotal} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
           
        </div>
    )
}
