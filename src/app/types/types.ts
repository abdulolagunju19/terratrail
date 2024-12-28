export interface Building {
    properties: {
        id: string;
        name: string;
        address: string;
        developer: string;
        image: string;
    };
    geometry: {
        type: 'Point'; // Add this line to specify that the geometry type is always 'Point'
        coordinates: [number, number];
    };
}