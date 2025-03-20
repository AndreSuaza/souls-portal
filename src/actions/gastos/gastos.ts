'use server';

import prisma from "@/lib/prisma";

export const getCost = async() => {
    try {
        const costs = await prisma.cost.findMany({
            include: {
                category: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: [
                {
                    createdDate: 'desc',
                },
            ],
        })

        return costs.map(cost => { return {...cost, nombreCategoria: cost.category.name}})
        
    } catch (error) {
        throw new Error(`No se pudo cargar los productos ${error}` );
    }
    

};