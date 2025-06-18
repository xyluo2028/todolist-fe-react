import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:7071',
});

const authConfig = (auth) => ({
  headers: {
    Authorization: `Basic ${btoa(`${auth.username}:${auth.password}`)}`,
  },
});

export const api = {
  register: (username, password) => apiClient.post('/register', { username, password }),
  getProjects: (auth) => apiClient.get('/printProjects', { auth }),
  getTasks: (project, auth) => apiClient.get(`/printTasks?pjt=${project}`,{ auth }),
  writeTask: (project, task, auth) => apiClient.post(`/writeTask?pjt=${project}`, task, { auth }),
  completeTask: (project, key, auth) => apiClient.get(`/completeTask?pjt=${project}&key=${key}`, { auth }),
  removeTask: (project, key, auth) => apiClient.get(`/removeTask?pjt=${project}&key=${key}`, { auth }),
  createProject: (project, auth) => apiClient.post(`/createProject?pjt=${project}`, authConfig(auth)),
};