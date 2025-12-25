import Student from "../model/Student.js";
import EnrollmentForm from "../model/EnrollmentForm.js";

class StudentService {
    async getAllStudents() {
        return await Student.find();
    }

    async getStudentById(studentId) {
        return await Student.findById(studentId);
    }

    async registerStudent(studentData) {
        const newStudent = new Student(studentData);
        await newStudent.save();
        return newStudent;
    }

    async updateStudent(studentId, updateData) {
        return await Student.findByIdAndUpdate(studentId, updateData, { new: true });
    }

    async deleteStudent(studentId) {
        return await Student.findByIdAndDelete(studentId);
    }

    async getStudentsBySI(si) {
        return await Student.find({studentId: si});
    }

    async getStudentsByClass(classId) {
        const enrollments = await EnrollmentForm.aggregate([
            {
                $match: { classId: classId }
            },
            {
                $lookup: {
                    from: "students",
                    localField: "studentId",
                    foreignField: "studentId",
                    as: "studentInfo"
                }
            },
            {
                $unwind: {
                    path: "$studentInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "classes",
                    localField: "className",
                    foreignField: "className",
                    as: "classInfo"
                }
            },
            {
                $unwind: {
                    path: "$classInfo",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    studentId: 1,
                    classId: 1,
                    className: 1,
                    enrollmentDate: 1,
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    "studentInfo.fullname": 1,
                    "studentInfo.dob": 1,
                    "studentInfo.sex": 1,
                    "studentInfo.address": 1,
                    "studentInfo.avatar": 1,
                    "classInfo.grade": 1,
                    "classInfo.homeroomTeacher": 1,
                    "classInfo.quantity": 1
                }
            }
        ]);
        return enrollments;
    }
}

export default new StudentService();