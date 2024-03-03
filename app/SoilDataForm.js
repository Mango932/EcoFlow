import React from "react";
import { toast } from "react-toastify";

const SoilDataForm = ({ onSubmit, formData, handleChanges }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        handleChanges((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmpty = Object.values(formData).some(value => value === '');
        if (!formData.N || !formData.P || !formData.K || !formData.temperature || !formData.humidity || !formData.ph || !formData.rainfall) {
            toast.error("Please fill in all fields.");
            return;
        }
        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className=" p-6 rounded-lg space-y-4 text-gray-800 "
        >
            <div className="flex flex-col">
                <label className="text-green-900 mb-1">
                    Nitrogen ratio in soil (%):
                </label>

                <input
                    type="number"
                    name="N"
                    value={formData.N}
                    onChange={handleChange}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-800 mb-1">
                    Phosphorous ratio in soil (%):
                </label>
                <input
                    type="number"
                    name="P"
                    value={formData.P}
                    onChange={handleChange}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-800 mb-1">
                    Potassium ratio (%):
                </label>
                <input
                    type="number"
                    name="K"
                    value={formData.K}
                    onChange={handleChange}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-800 mb-1">Temperature (°C):</label>
                <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-800 mb-1">Humidity (%):</label>
                <input
                    type="number"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-800 mb-1">pH value:</label>
                <input
                    type="number"
                    name="ph"
                    value={formData.ph}
                    onChange={handleChange}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-800 mb-1">
                    Past Year's Rainfall (mm):
                </label>
                <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md"
                />
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
                Submit
            </button>
        </form>
    );
};

export default SoilDataForm;
