// apiService.ts

const API_BASE_URL = 'https://dcag-gateway-cpypkzbg.an.gateway.dev';

const getHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  const token = accessToken; // we'll add actual token here

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
};

const apiService = {
  async getMyTasks(userId: string) {
    const endpoint = `users/${userId}/tasks`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.json();
  },
  async getTaskDetail(userId: string, taskId: string) {
    const endpoint = `users/${userId}/tasks/${taskId}`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.json();
  },
  async getMyTasksList(userId: string) {
    const endpoint = `users/${userId}/tasks`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.json();
  },
  async getAvailableTasks(userId) {
    const endpoint = `tasks?available=true&userId=${userId}`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.json();
  },
  async assignTask(userId: string, taskId: any) {
    const endpoint = `users/${userId}/tasks/${taskId}`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'IN_PROGRESS'
      })
    });
    return response.json();
  },
  async assignTaskToCompleted(userId: string, taskId: any, body: any) {
    const endpoint = `users/${userId}/tasks/${taskId}`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    return response.json();
  },
  async verifyPhoneNumber(phoneNumber: string) {
    const endpoint = `users/byPhoneNumber/${phoneNumber}`;
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  },
  async getTaskSummary(userId: string) {
    const endpoint = `users/${userId}/tasks/summary`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.json();
  },
  async saveAudioBlobToStorage(uploadUrl: string, audioBlob: Blob) {
    const headers = getHeaders();
    try {
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        processData: false,
        headers: {
          ...headers,
          'Content-Type': 'application/octet-stream',
          'Access-Control-Allow-Origin': '*'
        },
        body: audioBlob
      });
      return response;
    } catch (error) {
      console.error('Error saving audio blob:', error.message);
    }
  },
  async createUserInFirebase() {
    const response = await fetch(`http://localhost:3000/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: '+917702277716'
      })
    });
    return response.json();
  },
  async createImageUploadTask(){
    const endpoint = `tasks`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:"Default Task",
      taskType:"UPLOAD_IMAGE"})
    });
    return response.json();
  },
  async uplaodFileAndGetUploadUrl(userId:any,taskId:any,filename:any){
    const endpoint = `users/${userId}/tasks/${taskId}uploadUrl?${filename}`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
    });
    return response.json();
  },
};

export default apiService;
