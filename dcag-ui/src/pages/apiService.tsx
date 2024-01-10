// apiService.ts

const API_BASE_URL = 'https://dcag-gateway-cpypkzbg.an.gateway.dev';

const apiService = {
  async getMyTasks(userId: string) {
    const endpoint = `users/${userId}/tasks`;
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  },
  async getTaskDetail(taskId) {
    const endpoint = `tasks/${taskId}`;
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  }
 };

export default apiService;
