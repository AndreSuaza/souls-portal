'use server';

import prisma from "@/lib/prisma";

export const getCategories = async() => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: [
                {
                    createDate: 'asc',
                },
            ],
        })
    
        return categories;
        
    } catch (error) {
        throw new Error(`No se pudo cargar los productos ${error}` );
    }
    

};