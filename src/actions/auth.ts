'use server';

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// 1. Admin Login - email, password

export async function adminLogin(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const loginDetails = { email, password };

    try {

        const loginResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/login`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(loginDetails)
        })

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
            if (loginData.message) {
                return {
                    status: 'error',
                    message: loginData.message as string
                }
            }
            return {
                status: 'error',
                message: 'Some issue logging in. Try again!'
            }
        } 

        // const adminId = loginData.adminId;
        const authToken = loginData.token;

        if (!authToken) {
            return {
                status: 'error',
                message: 'Issue logging in. Try again!'
            }
        }
            
        if (cookies().has('reportal__auth__token')) {
            cookies().delete('reportal__auth__token');
        }

        cookies().set('reportal__auth__token', authToken, {
            secure: true,
            maxAge: 24*60*60
        });
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }
    
    redirect('/dashboard');
}

// 2. Admin Registration

export async function adminRegistration(formData: FormData) {

    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const phoneNumber = formData.get('phoneNumber');

    const registrationDetails = { name, email, password, phoneNumber };

    try {

        const registerResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/registration`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(registrationDetails)
        });

        const registerData = await registerResponse.json();

        console.log(registerData);

        if (!registerResponse.ok) {
            if (registerData.message) {
                return {
                    status: 'error',
                    message: registerData.message as string
                }
            }
            return {
                status: 'error',
                message: 'Some issue registering. Try again!'
            }
        }

        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }

    redirect('/');
}


// 3. Admin Logout

export async function adminLogout() {
    cookies().delete('reportal__auth__token');
    redirect('/'); 
}