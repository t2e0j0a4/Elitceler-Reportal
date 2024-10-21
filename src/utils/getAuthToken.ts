import { cookies } from 'next/headers';
 
export async function getAuthToken() {
  const authToken = cookies().get('reportal__auth__token')?.value;
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(authToken);
    }, 1000)
  );
}