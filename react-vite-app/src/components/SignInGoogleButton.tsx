import { GoogleLogin } from "@react-oauth/google";

export function SignInGoogleButton(){
    const handleLoginSuccess = (credentialResponse: object) => {
        console.log('Login Success:', credentialResponse);
    };

    const handleLoginFailure = () => {
        console.log('Login Failed');
    };

    return (
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
            type="standard"
            theme="filled_black"
            logo_alignment="left"
        />
    );
}