import ReactGA from 'react-ga4';
import generateClientIdGa from './generate-client-id-ga';

export const gaEnvKey = 'NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID';

const ga = {
    initGoogleAnalytics() {
        const trackingId = import.meta.env[gaEnvKey] ?? '';
        if (!trackingId) console.warn("No tracking id is found for Google Analytics")

        ReactGA.initialize([
            {
                trackingId,
                gaOptions: {
                    anonymizeIp: true,
                    clientId: generateClientIdGa()
                }
            }
        ]);
    }
};

export default ga;