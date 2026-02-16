import { apiClient } from './apiClient';
import { ENDPOINTS } from '../../../utils/constants/endpoints';

export const studentService = {
  getStudentProfile: async (studentId) => {
    return await apiClient.get(`${ENDPOINTS.STUDENTS}/${studentId}`);
  },
  getAllStudents: async () => {
    return await apiClient.get(ENDPOINTS.STUDENTS);
  },
  updateStudentProfile: async (studentId, profileData) => {
    return await apiClient.put(`${ENDPOINTS.STUDENTS}/${studentId}`, profileData);
  },
  getStudentRatings: async (studentId) => {
    return await apiClient.get(`${ENDPOINTS.STUDENTS}/${studentId}/ratings`);
  },
};