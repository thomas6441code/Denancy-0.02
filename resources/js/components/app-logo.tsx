import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center transform rotate-12 shadow-lg transition-all duration-500 hover:rotate-45">
                <AppLogoIcon className="w-6 h-6 lg:w-7 lg:h-7 transition-all duration-300" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    DENANCY LEGENGS <br/> GROUP
                </span>
            </div>
        </>
    );
}
