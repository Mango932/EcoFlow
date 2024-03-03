"use client";

import Navbar from "../Navbar";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            <Navbar />
            <div className="flex items-center flex-wrap justify-center">
                <div className=" text-green-700 mx-24 mt-10 mb-54 max-w-[800px]">
                    <h1 className="text-4xl font-bold mb-4">
                        About Our Product
                    </h1>
                    <div className="w-96 mb-5 h-1 bg-green-700"></div>
                    <p>
                        Welcome to our innovative web application dedicated to
                        helping farmers make informed decisions about crop
                        selection while also promoting environmental
                        sustainability.
                    </p>
                    <h2 className="text-2xl font-bold mt-4 mb-2">
                        Our Mission
                    </h2>
                    <div className="w-64 mb-5 h-1 bg-green-700 "></div>
                    <p>
                        At EcoFlow, we believe in harnessing the power of
                        technology to address pressing environmental challenges
                        and support agricultural sustainability. Our mission is
                        to empower farmers with intelligent decision-making
                        tools that optimize crop selection, minimize resource
                        wastage, and reduce pollution caused by failed crops.
                    </p>
                    <h2 className="text-2xl font-bold mt-4 mb-2">
                        How It Works
                    </h2>
                    <div className="w-64 mb-5 h-1 bg-green-700"></div>
                    <p>
                        Our web app combines advanced technology with
                        user-friendly interfaces to provide farmers with
                        actionable insights for crop selection. Here's how it
                        works:
                    </p>
                    <h2 className="text-2xl font-bold mt-4 mb-2">Our Vision</h2>
                    <div className="w-64 mb-5 h-1 bg-green-700"></div>
                    <p>
                        We envision a future where sustainable farming practices
                        are the norm, leading to healthier ecosystems, increased
                        food security, and a more sustainable agricultural
                        industry. By empowering farmers with cutting-edge
                        technology and actionable insights, we aim to play a
                        significant role in realizing this vision.
                    </p>
                    <ul className="list-disc pl-8 mt-4">
                        <li>
                            Input Soil and Environmental Parameters: Farmers can
                            input various soil parameters such as nitrogen (N),
                            phosphorus (P), and potassium (K) ratios, as well as
                            environmental factors like temperature, humidity, pH
                            value of the soil, and rainfall.
                        </li>
                        <li>
                            Map Integration: Our app integrates with Google Maps
                            API to autofill location-specific environmental
                            data, making it easier for farmers to input accurate
                            information.
                        </li>
                        <li>
                            AI Model Analysis: Once the parameters are provided,
                            our proprietary AI model analyzes the data to
                            determine the best-suited crops for the given
                            conditions. The model considers factors such as soil
                            nutrient levels, climate conditions, and historical
                            crop performance to make intelligent
                            recommendations.
                        </li>
                        <li>
                            Crop Recommendations: Based on the analysis, our app
                            generates personalized crop recommendations that
                            optimize yield potential while minimizing
                            environmental impact. Farmers receive detailed
                            insights into recommended crops, including growth
                            requirements, expected yield, and potential
                            environmental benefits.
                        </li>
                        <li>
                            Promoting Sustainability: By guiding farmers towards
                            selecting crops that are well-suited to their
                            specific environmental conditions, our app helps
                            reduce the risk of crop failure and minimize the
                            need for excessive fertilizer and pesticide use.
                            This, in turn, contributes to a healthier ecosystem
                            and reduces pollution caused by agricultural
                            practices.
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-full h-24 bg-green-100 mt-20"></div>
        </main>
    );
}
