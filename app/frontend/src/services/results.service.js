import apiClient from '../utils/client';

export const ResultsService = {
  async getGeneralInfo(id) {
    const response = await apiClient.get(`/results/${id}/general-info`);
    return response.data;
  },

  async getTraitScores(id) {
    const response = await apiClient.get(`/results/${id}/traits`);
    return response.data;
  },

  async getPosts(id) {
    const response = await apiClient.get(`/results/${id}/posts`);
    return response.data;
  }
};