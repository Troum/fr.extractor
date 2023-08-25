import httpCommon from "@/commons/http-common";
import SuccessResponseInterface from "@/interfaces/SuccessResponseInterface";

class APIService {
  public async uploadPDF(data: any): Promise<SuccessResponseInterface> {
      const response = await httpCommon.post<any>('/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return await response?.data
  }
}

export default new APIService()
