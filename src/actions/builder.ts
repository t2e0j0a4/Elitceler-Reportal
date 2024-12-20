'use server';

import { getAuthToken } from "@/utils/getAuthToken";
import { redirect } from 'next/navigation'
import { revalidatePath } from "next/cache";

// 1. New builder by Admin - name, phoneNo, email, password

export async function newBuilder(formData: FormData) {

    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    const name = formData.get('name');
    const email = formData.get('email');
    const phoneNo = formData.get('phoneNo');
    const password = formData.get('password');

    const registrationDetails = { name, email, password, phoneNo };

    try {

        const registerResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/createBuilder`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(registrationDetails)
        });

        const registerData = await registerResponse.json();

        // console.log(registerData);

        if (!registerResponse.ok) {
            if (registerResponse.status === 400 && registerData.error) {
                return {
                    status: 'error',
                    message: registerData.error as string
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

    revalidatePath('/dashboard/builders');

}

// 2. Fetch builder status

export async function fetchBuilderStatus() {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    try {

        const buildersResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/getBuilderStatus`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!buildersResponse.ok) {
            throw new Error('Issues fetching builders. Try again!')
        }

        const buildersData = await buildersResponse.json();

        return buildersData;
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }
}

// 3. Update Pending status

export async function updatePendingBuilder(status: 'APPROVED' | 'REJECTED', builderId: string) {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    const updation = {
        status: status
    };

    try {

        const updateVerificationStatus = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/updateBuilderStatus/${builderId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updation)
        });

        const updatedStatus = await updateVerificationStatus.json();
        console.log(updatedStatus);

        if (!updateVerificationStatus.ok) {
            if (updateVerificationStatus.status === 400) {
                return {
                    status: 'error',
                    message: updatedStatus.error as string
                }
            }
            return {
                status: 'error',
                message: 'Some issue updating status. Try again!'
            }
        }

        // return {
        //     status: 'success',
        //     message: 'Builder status changed!'
        // }
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }

    revalidatePath('/dashboard/builders');
}