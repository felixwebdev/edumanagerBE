import ClassTransferForm from "../model/ClassTransferForm.js";

class CTFormService {
    async getAllCTForms() {
        return await ClassTransferForm.find();
    }
    async createCTForm(ctformData) {
        const newCTForm = new ClassTransferForm(ctformData);
        await newCTForm.save();
        return newCTForm;
    }
    async getCTFormById(ctformId) {
        return await ClassTransferForm.findById(ctformId);
    }

    async deleteCTForm(ctformId) {
        return await ClassTransferForm.findByIdAndDelete(ctformId);
    }
}

export default new CTFormService();