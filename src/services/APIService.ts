import httpCommon from "@/commons/http-common";

class APIService {
  uploadPDF(data: any): Promise<any> {
    return httpCommon.post('/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default new APIService()
