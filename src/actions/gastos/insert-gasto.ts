'use server';


import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface Cost {

    name: string;
    value: number;
    annotation: string;
    categoryId: string;
    
}

export const postCost = async(cost : Cost) => {
    console.log(cost);
    try {
        const session = await auth();
        if(session?.user?.id) {
            const gastoInsertado = await prisma.cost.create({
                data: {...cost, userId: session.user.id}
            });
            return {
                ok: true,
                gasto: gastoInsertado
            }
        }
    } catch (error) {
        console.log(error);
       return {
        ok: false,
        message: `No se pudo crear el gasto ${error}`
       }
    }
    

};
