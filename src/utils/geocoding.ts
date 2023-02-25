export const geoCode = async (adress: string): Promise<{
    lat: number;
    lon: number;
}> => {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(adress)}&format=json`);
            const geoData = await geoRes.json();

            const lat = parseFloat(geoData[0].lat);
            const lon = parseFloat(geoData[0].lon);
            
            return {
                lat,
                lon,
            }
};