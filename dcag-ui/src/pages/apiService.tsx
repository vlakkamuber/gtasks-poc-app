// apiService.ts

const API_BASE_URL = "https://dcag-gateway-cpypkzbg.an.gateway.dev";

const getHeaders = () => {
  const token = 'yourBearerToken'; // we'll add actual token here

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

const apiService = {
  async getMyTasks(userId: string) {
    const endpoint = `users/${userId}/tasks`;
    const headers = getHeaders();
    //later we'll add token in each function like this
    // const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  },
  async getTaskDetail(taskId) {
    const endpoint = `tasks/${taskId}`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  },
  async getMyTasksList(userId) {
    const endpoint = `users/${userId}/tasks`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  },
  async getAvailableTasks() {
    const endpoint = `tasks?available=true`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  },
  async assignTask(userId: string, taskId: any) {
    const endpoint = `users/${userId}/tasks/${taskId}`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "IN_PROGRESS",
      }),
    });
    return response.json();
  },
  async assignTaskToCompleted(userId: string, taskId: any) {
    const endpoint = `users/${userId}/tasks/${taskId}`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "COMPLETED",
      }),
    });
    return response.json();
  },
  async verifyPhoneNumber(phoneNumber: string) {
    const endpoint = `users/byPhoneNumber/${phoneNumber}`;
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  },
  async getTaskDetail(taskId) {
    const endpoint = `tasks/${taskId}`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  },
  async getTaskSummary(userId) {
    const endpoint = `users/${userId}/tasks/summary`;
    const headers = getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  },
  async saveAudioBlobToStorage(uploadUrl:string,audioBlob: Blob) {
    const headers = getHeaders();
    try {
      const response = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: audioBlob,
      });
      return response.json();
    } catch (error) {
      console.error('Error saving audio blob:', error.message);
    }
  }
 };

export default apiService;
