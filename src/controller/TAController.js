import TAService from "../service/TAService.js";

class TAController {
    // Create a new teaching assignment
    async createTeachingAssignment(req, res) {
        try {
            const data = req.body;
            const newAssignment = await TAService.createTeachingAssignment(data);
            res.status(201).json(newAssignment);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all teaching assignments
    async getAllTeachingAssignments(req, res) {
        try {
            const assignments = await TAService.getAllTeachingAssignments();
            res.status(200).json(assignments);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a teaching assignment by ID
    async getTeachingAssignmentById(req, res) {
        try {
            const id = req.params.id;
            const assignment = await TAService.getTeachingAssignmentById(id);
            if (!assignment) {
                return res.status(404).json({ error: "Teaching assignment not found" });
            }
            res.status(200).json(assignment);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // Update a teaching assignment by ID
    async updateTeachingAssignment(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const updatedAssignment = await TAService.updateTeachingAssignment(id, data);
            if (!updatedAssignment) {
                return res.status(404).json({ error: "Teaching assignment not found" });
            }
            res.status(200).json(updatedAssignment);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // Delete a teaching assignment by ID
    async deleteTeachingAssignment(req, res) {
        try {
            const id = req.params.id;
            const deletedAssignment = await TAService.deleteTeachingAssignment(id);
            if (!deletedAssignment) {
                return res.status(404).json({ error: "Teaching assignment not found" });
            }
            res.status(200).json({ message: "Teaching assignment deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default new TAController();