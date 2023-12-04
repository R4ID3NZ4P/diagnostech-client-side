import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useDetails from "../../Hooks/useDetails";
import Swal from "sweetalert2";


const UpdateTest = () => {
    const axiosSecure = useAxiosSecure();
    const params = useParams();
    const {data, isPending} = useDetails(params.id);
    let date;
    let HTMLDate;
    
    if(!isPending) {
        date = data.date.split("/");
        HTMLDate = `${date[2]}-${date[0]}-${date[1]}`
    }

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.image.value;
        const price = form.price.value;
        const date = form.date.value.split("-");
        const slots = form.slots.value;
        const details = form.details.value;

        const info = {
            name,
            image,
            price: parseInt(price),
            date: `${date[1]}/${date[2]}/${date[0]}`,
            slots: parseInt(slots),
            details
        };

        console.log(info);
        axiosSecure.patch(`/tests/${params.id}`, info)
            .then(res => {
                console.log(res.data);
                if(res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Test updated successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center my-12">Update Test</h1>
            <form className="flex flex-col items-center justify-center space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input defaultValue={data.name} type="text" name="name" placeholder="Type name here" className="input input-bordered w-full" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Image URL</span>
                        </div>
                        <input defaultValue={data.image} type="text" name="image" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Price</span>
                        </div>
                        <input defaultValue={data.price} type="text" name="price" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Date</span>
                        </div>
                        <input defaultValue={HTMLDate} type="date" name="date" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Slots</span>
                        </div>
                        <input defaultValue={data.slots} type="text" name="slots" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Details</span>
                        </div>
                        <input defaultValue={data.details} type="text" name="details" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
                <button className="btn btn-warning btn-block">Update</button>
            </form>
        </div>
    );
};

export default UpdateTest;