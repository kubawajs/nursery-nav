import { v4 as uuidv4 } from 'uuid';

export const gaClientStorageKey = 'ga-gtag-client-id';

const generateClientIdGa = () => {
    let clientId = localStorage.getItem(gaClientStorageKey);

    if (!clientId) {
        clientId = uuidv4();
        localStorage.setItem(gaClientStorageKey, clientId);
    }

    return clientId;
};

export default generateClientIdGa;