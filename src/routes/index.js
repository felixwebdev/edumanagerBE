import UserRoutes from "./userRoutes.js";
import StudentRoutes from "./StudentRoutes.js";
import LeaderRoutes from "./LeaderRoutes.js";
import SubjectRoutes from "./SubjectRoutes.js";
import ClassRoutes from "./ClassRoutes.js";
import TeacherRoutes from "./TeacherRoutes.js";
import TARoutes from "./TARoutes.js";
import SubjectGradeRoutes from "./SubjectGradeRoutes.js";
import errorHandler from "../middleware/errorHandler.js";

export default function router(app) {

    app.use("/api/user", UserRoutes);
    app.use("/api/student", StudentRoutes);
    app.use("/api/leader", LeaderRoutes);
    app.use("/api/subject", SubjectRoutes);
    app.use("/api/class", ClassRoutes);
    app.use("/api/teacher", TeacherRoutes);
    app.use("/api/teaching-assignment", TARoutes);
    app.use("/api/subject-grade", SubjectGradeRoutes);

    app.use(errorHandler);
}
