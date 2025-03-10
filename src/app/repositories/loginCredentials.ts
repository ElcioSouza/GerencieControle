import prisma from "@/lib/prisma"

const loginCredentials = async (email: string) => {
    let user = await prisma.user.findUnique({where: {email}})
    if(user){
        return user
    }
    const collaborator = await prisma.collaborator.findUnique({where: {email}})
    if(collaborator){
        return collaborator
    }
    return null
}
export default loginCredentials
