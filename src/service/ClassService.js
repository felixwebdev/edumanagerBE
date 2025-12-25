import Class from "../model/Class.js";
import Teacher from "../model/Teacher.js";
import EFormService from "./EFormService.js";
import Student from "../model/Student.js";
import EnrollmentForm from "../model/EnrollmentForm.js";

class ClassService {
    async getAllClasses() {
        return await Class.find();
    }

    async createClass(classData) {
        const newClass = new Class(classData);
        await newClass.save();
        return newClass;
    }

    async updateClass(classId, updateData) {
        return await Class.findByIdAndUpdate(classId, updateData, { new: true });
    }

    async deleteClass(classId) {
        return await Class.findByIdAndDelete(classId);
    }

    async getClassById(classId) {
        const classInfo = await Class.findById(classId);
        const homeRoomTeacher = await Teacher.findById(classInfo.homeRoomTeacherId);
        const classWithTeacher = {
            ...classInfo.toObject(),
            homeRoomTeacher: homeRoomTeacher
        };
        return classWithTeacher;
    }

    async getAllClassesWithTeachers() {
        const classes = await Class.find();
        const classesWithTeachers = await Promise.all(classes.map(async (classInfo) => {
            const homeRoomTeacher = await Teacher.findById(classInfo.homeRoomTeacherId);
            return {
                ...classInfo.toObject(),
                homeRoomTeacher: homeRoomTeacher
            };
        }));
        return classesWithTeachers;
    }

    async getClassWithTeacher(teacherId) {
        const classInfo = Class.find({ homeroomTeacher: teacherId });
        return classInfo;
    }

    async getStudentsByClassId(classId) {
        const studentIdList = await EnrollmentForm.find({ classId: classId, status: "1" }, 'studentId');
        let students = [];
        for (const studentEntry of studentIdList) {
            const studentData = await Student.findOne({ studentId: studentEntry.studentId });
            if (studentData) {
                students.push(studentData);
            }
        }
        return students;
    }
}

export default new ClassService();