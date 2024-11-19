import apiClient from '../utils/client';

export const AnalysisService = {
  async getAllAnalyses() {
    const response = await apiClient.get('/analysis/');
    return response.data;
  },

  async createAnalysis(analysisData) {
    const response = await apiClient.post('/analysis/', analysisData);
    return response.data;
  },

  async getAnalysisById(id) {
    const response = await apiClient.get(`/analysis/${id}/`);
    return response.data;
  },

  async updateAnalysis(id, analysisData) {
    const response = await apiClient.put(`/analysis/${id}`, analysisData);
    return response.data;
  },

  async deleteAnalysis(id) {
    const response = await apiClient.delete(`/analysis/${id}`);
    return response.data;
  },

  async runAnalysis(id) {
    const response = await apiClient.post(`/analysis/${id}/run`);
    return response.data;
  }
};