import { useNavigate, useParams } from "react-router-dom";
import useDetails from "../../Hooks/useDetails";
import { FaArrowCircleRight } from "react-icons/fa";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const Details = () => {
    
    const params = useParams();
    console.log(params);
    const {data, refetch, isPending} = useDetails(params.id);
    const {user} = useAuth();
    console.log(data);
    const { booked, date, details, image, name, price, slots, _id } = data;
    const navigate = useNavigate();
    
    //stripe
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [netPrice, setNetPrice] = useState(0);

    useEffect(() => {
        setNetPrice(price);
        if (netPrice > 0){
            axiosSecure.post("/payment-intent", {price: netPrice})
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })}
    }, [price, axiosSecure, netPrice]);

    if (isPending) {
        return (
            <div className="min-h-screen px-5 lg:px-32 bg-gradient-to-r from-white to-[#038b9d7a] flex items-center justify-center">
                <div className="flex justify-center items-center">
                    <div className="flex flex-col gap-4 w-96">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        if(card === null) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        });

        if(error) {
            console.log(error);
            setError(error.message)
        }
        else{
            setError("");
        }

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        });

        if(confirmError) console.log(confirmError);
        else {
            if(paymentIntent.status === "succeeded") {
                console.log("trx ", paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    price: netPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    service: _id,
                    status: "pending"
                };
                axiosSecure.post("/bookings", payment)
                    .then(res => {
                        console.log(res.data);
                        if(res.data?.result?.insertedId) {
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: "Thank you for your payment",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                            navigate(-1);
                        }
                    })
            }
        }



    }
    
    return (
        <>
            <div className="min-h-screen py-12 px-5 lg:px-32 bg-gradient-to-r from-white to-[#038b9d7a] flex items-center justify-center">
            <div className="py-12">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
                    <div>
                        <img src={image} alt="" className="lg:w-[900px]" />
                    </div>
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl text-secondary font-bold mb-6">{name}</h1>
                        <p className="mb-6"><span className="text-secondary font-semibold">Booked Slots: </span>{booked}</p>
                        <p className="mb-6"><span className="text-secondary font-semibold">Available Slots: </span>{slots}</p>
                        <p className="mb-6"><span className="text-secondary font-semibold">Available Date: </span>{date}</p>
                        <p className="mb-6"><span className="text-secondary font-semibold">Price: </span>${price}</p>
                        <button onClick={()=>document.getElementById('book-modal').showModal()} 
                            className="btn btn-primary px-8 rounded-badge text-white" 
                            disabled={slots === 0 ? true : false} >Book Now <FaArrowCircleRight className="text-2xl" /></button>
                    </div>
                </div>
                <div className="mt-12">
                    <div role="tablist" className="tabs tabs-lifted">
                        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Details" checked />
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                            <h1 className="text-2xl font-bold mb-6 text-secondary">Details</h1>
                            {details}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="book-modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h1 className="mb-4"><span className="text-secondary font-semibold">Payable Amount:</span> ${netPrice}</h1>
                <form onSubmit={handleSubmit}>
                    <CardElement 
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                    <p className="text-red-600">{error}</p>
                    {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
                </form>
                <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                </form>
                </div>
            </div>
            </dialog>
        </>
    );
};

export default Details;