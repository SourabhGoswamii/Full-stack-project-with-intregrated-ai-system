import ProjectModel from "../models/project.model.js";
 export const createproject = async (Name,userId)=>{
    if(!Name){
        throw new Error("Name is required")
    }
    if(!userId){
        throw new Error("userId is required")
    }
    try {
        const existingProject = await ProjectModel.findOne({ name: Name });
        if (existingProject) {
            throw new Error("Project with this name already exists");
        }
        const project = await ProjectModel.create({ name: Name, users: [userId] });
        return project;
    } catch (error) {
        throw new Error(error.message);
    }
}
