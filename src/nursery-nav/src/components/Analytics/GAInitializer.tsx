import ga from './ga-init';

const GAInitializer = ({ children }: React.PropsWithChildren<{}>) => {
    ga.initGoogleAnalytics();

    return <>{children}</>
}

export default GAInitializer;