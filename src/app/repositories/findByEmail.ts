import prisma from "@/lib/prisma"

const findByEmail = async (email: string) => {
    let user = await prisma.user.findUnique({where: {email}})
    if(user) {
        return user
    }
    const collaborator = await prisma.collaborator.findUnique({where: {email}})
    if(collaborator && collaborator.status === "Ativo"){
        return collaborator
    }
    return null
}
export default findByEmail
