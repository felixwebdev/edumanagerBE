import TeachingAssignment from "../model/TeachingAssignment.js";
import Subject from "../model/Subject.js";
import Class from "../model/Class.js";

class TAService {
    // Create a new teaching assignment
    async createTeachingAssignment(data) {
        const subject = await Subject.findById(data.subject);
        const _class = await Class.findById(data.class);

        const newAssignment = new TeachingAssignment(data);
        newAssignment.subjectName = subject.name;
        newAssignment.className = _class.className;

        return await newAssignment.save();
    }

    // Get all teaching assignments
    async getAllTeachingAssignments() {
        return await TeachingAssignment.find();
    }

    // Get a teaching assignment by ID
    async getTeachingAssignmentById(id) {
        return await TeachingAssignment.findById(id);
    }

    // Update a teaching assignment by ID
    async updateTeachingAssignment(id, data) {
        return await TeachingAssignment.findByIdAndUpdate(id, data, { new: true });
    }

    async getTeachingAssignmentsByTeacher(teacherId) {
        const TA = await TeachingAssignment.find({ teacher: teacherId });
        return TA;
    }

    // Delete a teaching assignment by ID
    async deleteTeachingAssignment(id) {
        return await TeachingAssignment.findByIdAndDelete(id);
    }
}

export default new TAService();