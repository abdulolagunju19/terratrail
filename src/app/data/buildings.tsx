import { Building } from "../types/types";

export const buildings: { type: string; features: Building[] } = {
    type: 'FeatureCollection',
    features: [
        {
            geometry: {
                type: 'Point',
                coordinates: [-114.08154397092198, 51.04868473783537],
            },
            properties: {
                id: '1',
                name: 'The Cornerstone',
                address: '909 5 Avenue S.W.',
                developer: 'Peoplefirst Developments',
                image: '/peoplefirst-developments.jpg',
            },
        },
        {
            geometry: {
                type: 'Point',
                coordinates: [-114.08033584469766, 51.04960108253357],
            },
            properties: {
                id: '2',
                name: 'Element Hotel',
                address: '833 4 Avenue S.W.',
                developer: 'PBA Group of Companies',
                image: '/pba-group-of-companies.jpg',
            },
        },
        {
            geometry: {
                type: 'Point',
                coordinates: [-114.0615292092156, 51.04430067700774],
            },
            properties: {
                id: '3',
                name: 'Palliser One',
                address: '125 9 Avenue S.E.',
                developer: 'Aspen Properties',
                image: '/aspen.jpg',
            },
        },
        {
            geometry: {
                type: 'Point',
                coordinates: [-114.06002350740891, 51.04443937875622],
            },
            properties: {
                id: '4',
                name: 'Teck Place',
                address: '205 9 Avenue S.E.',
                developer: 'Cidex Group of Companies',
                image: '/cidex.jpg',
            },
        },
        {
            geometry: {
                type: 'Point',
                coordinates: [-114.0782577062078, 51.05007511557982],
            },
            properties: {
                id: '5',
                name: 'The Loft',
                address: '744 4 Avenue S.W.',
                developer: 'Institutional Mortgage Capital',
                image: '/institutional_mortgage_capital_logo.jpg',
            },
        },
        {
            geometry: {
                type: 'Point',
                coordinates: [-114.07319829110197, 51.050465444627434],
            },
            properties: {
                id: '6',
                name: 'Eau Claire Place I',
                address: '525 3 Avenue S.W.',
                developer: 'Cidex Group of Companies',
                image: '/cidex.jpg',
            },
        },
        {
            geometry: {
                type: 'Point',
                coordinates: [-114.07256813158169, 51.05042685063221],
            },
            properties: {
                id: '7',
                name: 'Eau Claire Place II',
                address: '521 3 Avenue S.W.',
                developer: 'Pacific Reach Properties Development',
                image: '/pacific-reach-properties.jpg',
            },
        },
        {
            geometry: {
                type: 'Point',
                coordinates: [-114.07915495474073, 51.045774167092894],
            },
            properties: {
                id: '8',
                name: 'Taylor Building',
                address: '805 8 Avenue S.W.',
                developer: 'Cressey Development Group',
                image: '/cressey.jpg',
            },
        },
        {
            geometry: {
                type: 'Point',
                coordinates: [-114.07832427391098, 51.0462445150538],
            },
            properties: {
                id: '9',
                name: 'Petro Fina Building',
                address: '736 8 Avenue S.W.',
                developer: 'Peoplefirst Developments',
                image: '/peoplefirst-developments.jpg',
            },
        },
        {
            geometry: {
                type: 'Point',
                coordinates: [-114.07596903200698, 51.045770521407],
            },
            properties: {
                id: '10',
                name: 'Dominion Centre',
                address: '665 8 Avenue S.W.',
                developer: 'Alston Properties/Slate Asset Management',
                image: '/alston-properties.png',
            },
        },
        {
            geometry: {
                type: 'Point',
                coordinates: [-114.07905780380149, 51.0483135584794],
            },
            properties: {
                id: '11',
                name: 'Place 800',
                address: '800 6 Avenue S.W.',
                developer: 'Peoplefirst Developments',
                image: '/peoplefirst-developments.jpg',
            },
        },
    ],
};