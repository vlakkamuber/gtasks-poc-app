// apiService.ts

const API_BASE_URL = 'https://dcag-gateway-cpypkzbg.an.gateway.dev';

interface OptionsType {
  user?: any;
}

const getHeaders: (options?: OptionsType) => Record<string, string> = ({ user } = {}) => {
  const token = user.accessToken;

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  };
};

const apiService = {
  async getMyTasks(userId: string) {
    const endpoint = `users/${userId}/tasks`;
    const headers = getHeaders({ user });
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.json();
  },
  async getTaskDetail({ userId, taskId, user }: { userId: string; taskId: string; user: any }) {
    const endpoint = `users/${userId}/tasks/${taskId}`;
    const headers = getHeaders({ user });
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.json();
  },
  async getMyTasksList({ userId, user, status }: { userId: string; user: any; status: any }) {
    const endpoint = `users/${userId}/tasks?status=${status}`;
    const headers = getHeaders({ user });
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.json();
  },
  async getAvailableTasks({
    userId,
    user,
    selectedCategory
  }: {
    userId: string;
    user: any;
    selectedCategory: any;
  }) {
    const endpoint =
      selectedCategory === 'ALL'
        ? `tasks?available=true&userId=${userId}`
        : `tasks?available=true&userId=${userId}&taskType=${selectedCategory}`;
    const headers = getHeaders({ user });
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.json();
  },
  async assignTask({ userId, taskId, user }: { userId: string; taskId: string; user: any }) {
    const endpoint = `users/${userId}/tasks/${taskId}`;
    const headers = getHeaders({ user });
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
  async assignTaskToCompleted({
    userId,
    taskId,
    body,
    user
  }: {
    userId: string;
    taskId: any;
    body: any;
    user: any;
  }) {
    const endpoint = `users/${userId}/tasks/${taskId}`;
    const headers = getHeaders({ user });
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
  async getTaskSummary({ userId, user }: { userId: string; user: any }) {
    const endpoint = `users/${userId}/tasks/summary`;
    const headers = getHeaders({ user });
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.json();
  },
  async saveAudioBlobToStorage({
    uploadUrl,
    audioBlob,
    user
  }: {
    uploadUrl: string;
    audioBlob: Blob;
    user: any;
  }) {
    const headers = getHeaders({ user });
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
  async createImageUploadTask({ user }: { user: any }) {
    const endpoint = `tasks`;
    const headers = getHeaders({ user });
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Default Task', taskType: 'UPLOAD_IMAGE', price: 2 })
    });
    return response.json();
  },
  async uplaodFileAndGetUploadUrl({
    userId,
    taskId,
    filename,
    user
  }: {
    userId: any;
    taskId: any;
    filename: any;
    user: any;
  }) {
    const endpoint = `users/${userId}/tasks/${taskId}/uploadUrl?fileName=${filename}`;
    const headers = getHeaders({ user });
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET'
    });
    return response.text();
  },
  async uploadImageToStorageUrl({ uploadUrl, file, user }) {
    const headers = getHeaders({ user });
    try {
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        processData: false,
        headers: {
          ...headers,
          'Content-Type': 'application/octet-stream',
          'Access-Control-Allow-Origin': '*'
        },
        body: file
      });
      return response;
    } catch (error) {
      console.error('Error saving audio blob:', error.message);
    }
  },
  async releaseTask({ userId, taskId, user }) {
    const headers = getHeaders({ user });
    const endPoint = `users/${userId}/tasks/${taskId}`;
    const response = await fetch(`${API_BASE_URL}/${endPoint}`, {
      method: 'DELETE',
      headers
    });
    return response.text();
  },
  async saveIssue({ userId, body, user }: { userId: string; body: any; user: any }) {
    const endpoint = `users/${userId}/issues`;
    const headers = getHeaders({ user });
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    return response;
  },
  async createUserInDB(uid, phoneNumber) {
    const endpoint = `users`;
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: uid, phoneNumber: phoneNumber })
    });
    return response;
  },
  async recordAnalytics(
    userId,
    user,
    { sessionId, actions, page, city, properties, otherDetails }
  ) {
    const endpoint = `users/${userId}/analytics/events`;
    const headers = getHeaders({ user });
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        sessionId,
        actions,
        page,
        city,
        properties,
        otherDetails
      })
    });
    return response;
  },
  async getTrainingsDoc({user}:{user:any}){
    const endpoint = `docs?type=training`;
    const headers = getHeaders({ user });
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
    return response.json();
  }
};

export default apiService;
