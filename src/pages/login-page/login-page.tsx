import '../../styles/login-page/login-page.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../axios/axios-instance';

const schema = z.object({
    api_key: z.string().min(1, { message: "API Key is required" }),
});

const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const navigate = useNavigate();
    const [isLogin, setLogin] = useState(false);

    const onSubmit = (data: any) => {
        console.log('Submitting data:', data);

        const payload = {
            api_key: data?.api_key,
        };
        localStorage.setItem("api_key", payload?.api_key)
        console.log(payload?.api_key);

        try {
            axiosInstance.get(`authentication/token/new?api_key=${payload?.api_key}`)
                .then((response) => {
                    console.log("request_token", response?.data.request_token);

                    if (response?.data?.request_token) {
                        // Save the token details to localStorage
                        localStorage.setItem("userTokenDetails", JSON.stringify(response.data));
                        localStorage.setItem("request_token", response?.data.request_token);

                        // Redirect to the authorization page with the correct redirect URL
                        const redirectUrl = encodeURIComponent('http://localhost:5173/approved');
                        window.location.href = `https://www.themoviedb.org/authenticate/${response?.data.request_token}?redirect_to=${redirectUrl}`;

                    } else {
                        console.error("Failed to get request token");
                    }
                }).catch((error) => {
                    console.error("Error in authentication request", error);
                });
        } catch (error) {
            console.error("Unexpected error", error);
        }
    };


    return (
        <section className="login-page-section container">
            <div className='login-form-container'>
                <h1>Ready To Explore Latest Movies And TV Shows?</h1>
                <h2>Login to my website and start exploring your favorite movies today!</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='api_key_field'>
                        <label htmlFor="api_key">Enter Your TMDB API KEY</label>
                        <input type="text" {...register("api_key")} id='api_key' placeholder='Enter Api Key Here' />
                        {errors.api_key && <p>{errors.api_key.message}</p>}
                    </div>
                    <button className='login-btn' type='submit'>Login</button>
                </form>
            </div>
            <div className='login-instruction-container'>
                <h1>Steps to get TMDB API KEY</h1>
                <h6>To obtain a TMDb API key, sign in or create an account on The Movie Database website, navigate to your account settings, then click on the "API" link to request a key, agreeing to the terms of use and filling in the required information. </h6>
                <div className='detailed-instruction-container'>
                    <h6>Here's a more detailed breakdown:</h6>
                    <div className='instruction-steps'>
                        <h5>Sign in or Create an Account:</h5>
                        <p>Go to The Movie Database website (themoviedb.org) and either sign in with an existing account or create a new one.</p>
                    </div>
                    <div className='instruction-steps'>
                        <h5>Navigate to Account Settings:</h5>
                        <p>Once logged in, click on your profile icon (usually in the top right corner) and then select "Settings" or "Account Settings".</p>
                    </div>
                    <div className='instruction-steps'>
                        <h5>Access the API Section:</h5>
                        <p>Within your account settings, look for a section labeled "API" or a link that directs you to the API page.</p>
                    </div>
                    <div className='instruction-steps'>
                        <h5>Request an API Key:</h5>
                        <p>On the API page, you'll find a section to request an API key. Click on the appropriate link or button to proceed.</p>
                    </div>
                    <div className='instruction-steps'>
                        <h5>Agree to Terms and Fill in Information:</h5>
                        <p>Before being issued an API key, you'll need to agree to the terms of use and fill in the required information, such as the type of use (e.g., personal or commercial), application name, and application URL.</p>
                    </div>
                    <div className='instruction-steps'>
                        <h5>Obtain Your API Key:</h5>
                        <p>Once you've completed the registration process, your API key will be displayed on the API page.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;
