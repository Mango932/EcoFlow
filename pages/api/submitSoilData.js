export default async function handler(req, res) {
    console.log("API route accessed");
    console.log("Request method:", req.method);
    
    if (req.method === 'POST') {
        const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

        // Process the soil data (e.g., save to a database, perform calculations, etc.)
        // For demonstration purposes, we'll just log the data
        console.log(`Received data: N=${N}, P=${P}, K=${K}, temperature=${temperature}, humidity=${humidity}, ph=${ph}, rainfall=${rainfall}`);

        res.status(200).json({ message: 'Soil data received' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
