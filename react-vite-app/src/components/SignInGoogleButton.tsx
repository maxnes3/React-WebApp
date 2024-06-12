export function SignInGoogleButton(){
    return (
        <button type="submit" 
            className={`flex items-center space-x-2 p-2 px-6 py-3 bg-transparent border-2 border-googleBlue text-white font-bold rounded-md hover:bg-googleBlue hover:border-transparent focus:outline-none focus:ring-2 focus:ring-googleBlue`}>
            <img src="/google-icon.svg" 
                alt="google"
                className={`h-4 w-4`}
            />
            <span>Sign in with Google</span>
        </button>
    );
}