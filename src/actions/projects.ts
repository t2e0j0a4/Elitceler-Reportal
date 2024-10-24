"use server";

import { getAuthToken } from "@/utils/getAuthToken";

// 1. Create New Villa

export async function addNewVilla(formData: FormData, builderId: string) {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    console.log(formData, builderId);

    try {

        const villaAddResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/createVilla`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        });

        const villaAddData = await villaAddResponse.json();

        if (!villaAddResponse.ok) {
            console.log(villaAddData)
            return {
                status: 'error',
                message: 'Issues adding villa. Try again'
            }
        }

        const projectId = villaAddData.data.projectId;

        return updateBuilderWithProject("villa", builderId, projectId);
        
    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }
}


// 2. Create New Plot

export async function addNewPlot(formData: FormData, builderId: string) {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }


    try {

        const plotAddResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/createPlot`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        });

        const plotAddData = await plotAddResponse.json();

        // console.log(plotAddData);

        if (!plotAddResponse.ok) {
            return {
                status: 'error',
                message: 'Issues adding plot. Try again'
            }
        }

        const projectId = plotAddData.data.projectId;

        return updateBuilderWithProject("plot", builderId, projectId);
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }
}


// 3. Create New Appartment

export async function addNewApartment(formData: FormData, builderId: string) {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    console.log(formData, builderId);

    try {

        const apartmentAddResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/createApartment`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        });

        const apartmentAddData = await apartmentAddResponse.json();

        if (!apartmentAddResponse.ok) {
            console.log(apartmentAddData)
            return {
                status: 'error',
                message: 'Issues adding apartment. Try again'
            }
        }

        const projectId = apartmentAddData.project.projectId;

        return updateBuilderWithProject("apartment", builderId, projectId);
        
    } catch (error) {
        console.log(error)
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }

}


// 4. Update Builder with Project

export async function updateBuilderWithProject(projectType: 'plot' | 'apartment' | 'villa', builderId: string, projectId: string) {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    let plotProjectID: string, apartmentProjectID: string, villaProjectID: string;
    
    let projectUpdate: {
        builderId: string;
        plotProjectID?: string;
        villaProjectID?: string;
        apartmentProjectID?: string;
    } = {
        builderId: builderId
    };

    (projectType === 'plot') ? (
        plotProjectID = projectId,
        projectUpdate = {...projectUpdate, plotProjectID}
    ) : (projectType === 'apartment') ? (
        apartmentProjectID = projectId,
        projectUpdate = {...projectUpdate, apartmentProjectID}
    ) : (projectType === 'villa') ? (
        villaProjectID = projectId,
        projectUpdate = {...projectUpdate, villaProjectID}
    ) : null

    console.log(projectUpdate);

    try {

        if (!projectType || !projectId || !builderId) {
            return {
                status: 'error',
                message: 'Invalid selection'
            }
        }

        const updateResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/assignProjectToBuilder`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(projectUpdate)
        });

        // console.log(await updateResponse.json())

        if (!updateResponse.ok) {
            return {
                status: 'error',
                message: 'Issue with updating builder project.'
            }
        }

        return {
            status: 'success',
            message: 'Added project to selected builder.'
        }
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }
}

// *****************************************************************

// 5. Fetch all admin added plots

export async function fetchAllAdminPlots() {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    try {

        const plotsResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/getAllAdminPlots`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!plotsResponse.ok) {
            throw new Error('Issues fetching plots. Try again!')
        }

        const plotsData = await plotsResponse.json();

        return plotsData;
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }
}

// 6. Fetch all admin added villas

export async function fetchAllAdminVillas() {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    try {

        const villasResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/getAllAdminVillas`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!villasResponse.ok) {
            throw new Error('Issues fetching villas. Try again!')
        }

        const villasData = await villasResponse.json();

        return villasData;
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }
}

// 7. Fetch all admin added villas

export async function fetchAllAdminApartments() {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    try {

        const apartmentsResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/getAllAdminApartment`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!apartmentsResponse.ok) {
            throw new Error('Issues fetching apartments. Try again!')
        }

        const apartmentsData = await apartmentsResponse.json();

        return apartmentsData;
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }
}

// 8. Fetch all builders projects - apartments, villas, plots

export async function fetchAllBuilderProjects() {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    try {

        const allBuilderProjectsResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/getBuilderProjects`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!allBuilderProjectsResponse.ok) {
            throw new Error('Issues fetching builder projects. Try again!')
        }

        const projectsData = await allBuilderProjectsResponse.json();

        return projectsData;
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }
}

/*

{
    message: '',
    apartment: {
        count: 1,
        categorizedApat: {
            PENDING: [],
            APPROVED: [],
            REJECTED: []
        }
    },
    villa: {
        count: 2,
        categorizedVilla: {
            PENDING: [],
            APPROVED: [],
            REJECTED: []
        }
    },
    plots: {
        count: 3,
        categorizedPlots: {
            PENDING: [],
            APPROVED: [],
            REJECTED: []
        }
    }
}

*/