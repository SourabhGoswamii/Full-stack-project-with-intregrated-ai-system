import ProjectModel from "../models/project.model";
export const createproject = async (Name,userId)=>{
    if(!Name){
        throw new Error("Name is required")
    }
    if(!userId){
        throw new Error("userId is required")
    }
    const project =await ProjectModel.create({name:Name,users:[userId]});
    return project;
     
}