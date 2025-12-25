import Subject from "../model/Subject.js";

class SubjectService {
    async getAllSubjects() {
        return await Subject.find();
    }

    async createSubject(subjectData) {
        const newSubject = new Subject(subjectData);
        await newSubject.save();
        return newSubject;
    }

    async deleteSubject(id) {
        return await Subject.findByIdAndDelete(id);
    }
}
export default new SubjectService();