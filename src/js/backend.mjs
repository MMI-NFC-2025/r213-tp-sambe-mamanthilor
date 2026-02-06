import PocketBase from 'pocketbase';

const db = new PocketBase('http://127.0.0.1:8090');

export async function getOffres() {
    try {
        let data = await db.collection('maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getImageUrl(record, recordImage) {
    return db.files.getURL(record, recordImage);
}

export async function getOffre(id) {
    try {
        const data = await db.collection('maison').getOne(id);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getOffresByMinSurface(minSurface) {
    try {
        const data = await db.collection('maison').getFullList({
            filter: `surface >= ${minSurface}`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les maisons par surface', error);
        return [];
    }
}

export async function getOffresByMaxPrice(maxPrice) {
    try {
        const data = await db.collection('maison').getFullList({
            filter: `prix <= ${maxPrice}`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les maisons par prix', error);
        return [];
    }
}

export async function getOffresByPriceRange(minPrice, maxPrice) {
    try {
        const data = await db.collection('maison').getFullList({
            filter: `prix >= ${minPrice} && prix <= ${maxPrice}`,
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant les maisons par prix', error);
        return [];
    }
}
