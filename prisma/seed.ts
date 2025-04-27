    import { Prisma, PrismaClient } from "@prisma/client"

    const prisma = new PrismaClient();

    const initialQuiz: Prisma.QuizzyCreateInput[] = [
        {
            question: "Which country",
            correctanswer : 1,
            answerimage : "answer.png",
            answertext : "Dont know",
            options : ["Nepal", "USA", "China","Korea"]
        }
    ];
async function main() {
    for (const element of initialQuiz) {
        try{
            await prisma.quizzy.create({
                data: element,
            })
            console.log(`Data created succesfully ${JSON.stringify(element)}`)
        } catch(error: unknown){
            if(error instanceof Prisma.PrismaClientKnownRequestError && error.code==='P2002'){
                console.log("The values need to be unique.")
            }
        };
        }
    console.log("Seeding finished !")
}
export default main()