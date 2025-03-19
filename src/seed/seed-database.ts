
import prisma from '../lib/prisma';
import { initialData } from "./seed-users";

async function main() {
   
    // await prisma.cost.deleteMany()  
    // await prisma.category.deleteMany()  
    // await prisma.user.deleteMany()  
     

    // const { users } = initialData

    // await prisma.user.createMany({
    //     data: users
    // });

    // const { categories } = initialData

    // await prisma.category.createMany({
    //     data: categories
    // });

}

(() => {
    if(process.env.NODE_ENV === 'production') return
    main();
})();