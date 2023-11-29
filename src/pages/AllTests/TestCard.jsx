import React from "react";

const TestCard = ({ data }) => {

    const { booked, date, details, image, name, price, slots, _id } = data;

    return (
        <div className="card w-96 glass">
            <figure>
                <img
                    src={image}
                    alt="Test"
                    className="h-[256px]"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="text-secondary"><span className="text-primary">Available Date:</span> {date}</p>
                <p className="text-secondary"><span className="text-primary">Remaining Slots:</span> {slots}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary text-white">Details</button>
                </div>
            </div>
        </div>
    );
};

export default TestCard;
