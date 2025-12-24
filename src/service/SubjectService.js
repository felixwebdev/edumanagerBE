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
}
export default new SubjectService();