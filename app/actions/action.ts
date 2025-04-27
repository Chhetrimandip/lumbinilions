"use server";

// Dynamic import to ensure Prisma only runs on server
export async function createFan(formdata: FormData) {
    // Import PrismaClient dynamically within the server ac
        const { PrismaClient } = await import("@prisma/client");
        const prisma = new PrismaClient();    
    try {
         await prisma.fan.create({
            data: {
                phone: formdata.get("phone") as string,
                name: formdata.get("name") as string,
                email: formdata.get("email") as string,
                time: Number(formdata.get("time")),
                score: Number(formdata.get("score")), // Note: was incorrectly using "email" here
            }
        });
        
        // Always disconnect after use when using a new client
        await prisma.$disconnect();
        return { success: true };
    } catch (error) {
        console.error("Error creating fan:", error);
        await prisma.$disconnect();
        return { success: false, error: "Failed to create record" };
    }}