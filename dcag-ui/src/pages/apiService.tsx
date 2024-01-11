// apiService.ts

const API_BASE_URL = "https://dcag-gateway-cpypkzbg.an.gateway.dev";

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
  },
  async getMyTasksList(userId) {
    const endpoint = `users/${userId}/tasks`;
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  },
  async getAvailableTasks() {
    const endpoint = `tasks?available=true`;
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  },
  async assignTask(userId: string, taskId: any) {
    const endpoint = `users/${userId}/tasks/${taskId}`;
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        status: "IN_PROGRESS",
      },
    });
    return response.json();
  },
  async assignTaskToCompleted(userId: string, taskId: any) {
    const endpoint = `users/${userId}/tasks/${taskId}`;
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        status: "COMPLETED",
      },
    });
    return response.json();
  },
  async verifyPhoneNumber(phoneNumber: string) {
    const endpoint = `users/byPhoneNumber/${phoneNumber}`;
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return response.json();
  }
};

export default apiService;
