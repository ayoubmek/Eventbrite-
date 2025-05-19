export const advertisements = [
    {
        id: 1,
        title: 'Promotion Été 2024',
        imageUrl: 'https://www.infomediaire.net/wp-content/uploads/2019/06/Tanger.jpg',
        redirectUrl: 'https://example.com/promo',
        description: 'Offres spéciales pour l\'été',
        startDate: '2025-05-01',
        endDate: '2025-08-31',
        isActive: true
    },
    {
        id: 2,
        title: 'Nouveaux Événements',
        imageUrl: 'https://www.tunisienumerique.com/wp-content/uploads/2024/07/carthage-1-1200x720.jpg',
        redirectUrl: 'https://example.com/events',
        description: 'Découvrez nos nouveaux événements',
        startDate: '2025-05-01',
        endDate: '2025-05-31',
        isActive: true
    }
];

export const getActiveAdvertisements = () => {
    const now = new Date();
    return advertisements.filter(ad => {
        const startDate = new Date(ad.startDate);
        const endDate = new Date(ad.endDate);
        return ad.isActive && startDate <= now && endDate >= now;
    });
};

export const updateAdvertisement = (id, updatedData) => {
    const index = advertisements.findIndex(ad => ad.id === id);
    if (index !== -1) {
        advertisements[index] = { ...advertisements[index], ...updatedData };
    }
    return advertisements[index];
};

export const addAdvertisement = (newAd) => {
    const id = advertisements.length > 0 ? Math.max(...advertisements.map(a => a.id)) + 1 : 1;
    const ad = { ...newAd, id };
    advertisements.push(ad);
    return ad;
};

export const deleteAdvertisement = (id) => {
    const index = advertisements.findIndex(ad => ad.id === id);
    if (index !== -1) {
        advertisements.splice(index, 1);
    }
}; 