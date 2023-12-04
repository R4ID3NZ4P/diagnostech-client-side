import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AddABanner = () => {
    const axiosSecure = useAxiosSecure();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image = form.image.value;
        const coupon = form.coupon.value;
        const rate = form.rate.value;
        const description = form.description.value;

        const info = {
            title,
            image,
            rate: parseInt(rate),
            coupon,
            description,
            isActive: false
        };

        console.log(info);
        axiosSecure.post("/banners", info)
            .then(res => {
                if(res.data.insertedId) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Banner added successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center my-12">Add A Banner</h1>
            <form className="flex flex-col items-center justify-center space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Title</span>
                        </div>
                        <input type="text" name="title" placeholder="Type title here" className="input input-bordered w-full" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Image URL</span>
                        </div>
                        <input type="text" name="image" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Coupon Code</span>
                        </div>
                        <input type="text" name="coupon" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Discount Rate</span>
                        </div>
                        <input type="text" name="rate" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <input type="text" name="description" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
                <button className="btn btn-warning btn-block">Submit</button>
            </form>
        </div>
    ); 
};

export default AddABanner;