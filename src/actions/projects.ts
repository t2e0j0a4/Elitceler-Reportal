"use server";

import { getAuthToken } from "@/utils/getAuthToken";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. Create New Villa - Admin

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
            if (villaAddResponse.status === 400 && !villaAddResponse.ok) {
                return {
                    status: 'error',
                    message: villaAddData.error
                }
            }
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


// 2. Create New Plot - Admin

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
            if (plotAddResponse.status === 400 && !plotAddResponse.ok) {
                return {
                    status: 'error',
                    message: plotAddData.error
                }
            }
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


// 3. Create New Appartment - Admin

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
            if (apartmentAddResponse.status === 400 && !apartmentAddResponse.ok) {
                return {
                    status: 'error',
                    message: apartmentAddData.error
                }
            }
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


// 4. Update Builder with Project - Admin

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

// 5. Fetch all admin added plots - Admin

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

// 6. Fetch all admin added villas - Admin

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

// 7. Fetch all admin added villas - Admin

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

// 8. Fetch admin single project details - Admin

export async function fetchAdminSingleProjectDetails(projectId: string, projectType: 'apartment' | 'plot' | 'villa') {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    const queryString = projectType === 'apartment' ? `getAdminApartmentDetails/${projectId}` : projectType === 'plot' ? `getAdminPlotDetails/${projectId}` : `getAdminVillaDetails/${projectId}`

    try {

        const adminSingleProjectDetails = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/${queryString}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        if (!adminSingleProjectDetails.ok) {
            return {
                status: 'error',
                message: 'Failed to fetch project details. Please try again!'
            }
        }

        const projectDetails = await adminSingleProjectDetails.json();
        return projectDetails;
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        } 
    }
}

// 9. Delete Apartment, Villa, plot by projectId

export async function deleteAdminProject(projectId: string, projectType: 'apartment' | 'plot' | 'villa') {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    const queryString = projectType === 'apartment' ? `deleteAdminApartment/${projectId}` : projectType === 'plot' ? `deleteAdminPlot/${projectId}` : `deleteAdminVilla/${projectId}`

    try {
        
        const deleteSingleProject = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/${queryString}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });

        const deleteProjectData = await deleteSingleProject.json();
        console.log(deleteProjectData)

        if (!deleteSingleProject.ok) {
            return {
                status: 'error',
                message: 'Issue deleting project. Try again!'
            }
        }

        // return {
        //     status: 'success',
        //     message: deleteProjectData.message
        // }

    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        } 
    }

    redirect(`/dashboard/projects?projectType=${projectType}`);
}

// 10. Edit - Apartment, Plot, villa - Admin

export async function editAdminProjectById(formData:FormData, projectId: string, projectType: 'apartment' | 'plot' | 'villa') {
    const authToken = await getAuthToken();

    if (!authToken) {
        console.log('Admin Not Authorized!');
        return {
            status: 'error',
            message: 'Unauthorized! Please Login.'
        }
    }

    console.log(formData, projectId, projectType);

    const queryString = projectType === 'apartment' ? `updateAdminOwnApartment/${projectId}` : projectType === 'plot' ? `updateAdminOwnPlot/${projectId}` : `updateAdminOwnVilla/${projectId}`


    try {

        const editSingleResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/${queryString}`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        });

        const editResponseData = await editSingleResponse.json();

        console.log(editResponseData);

        if (!editSingleResponse.ok) {
            if (editSingleResponse.status === 400 && !editSingleResponse.ok) {
                return {
                    status: 'error',
                    message: editResponseData.error
                }
            }
            return {
                status: 'error',
                message: 'Issues updating apartment. Try again'
            }
        }
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        } 
    }

    redirect(`/dashboard/projects/${projectId}?type=${projectType}`)
}

// ***********************************************************************************

// 10. Fetch all builders projects - Builder

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

// 11. Update Builder Project Status - projectId

export async function updateBuilderProjectStatus(status: 'APPROVED' | 'REJECTED', projectId: string) {
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

        const updateProjectStatusResponse = await fetch(`${process.env.SERVER_HOST_URL}/api/v1/admin/updateBuilderProjectStatus/${projectId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(updation)
        });

        const updatedStatus = await updateProjectStatusResponse.json();
        console.log(updatedStatus);

        if (!updateProjectStatusResponse.ok) {
            if (updateProjectStatusResponse.status === 400) {
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

        return {
            status: 'success',
            message: 'Project status changed!'
        }
        
    } catch (error) {
        return {
            status: 'error',
            message: 'Internal Server Issues'
        }
    }

    revalidatePath('/dashboard/projects/builders');
}
