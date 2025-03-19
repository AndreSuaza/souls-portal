
import bcryptjs from "bcryptjs";

interface SeedUser {
    email: string;
    password: string;
    name: string;
    role: 'admin' 
}

interface SeedCategories {
    name: string;
}

interface SeedData {
    users: SeedUser[];
    categories: SeedCategories[];
}

export const initialData: SeedData = {
    users: [
        {
            email: 'lideratimu@gmail.com',
            name: 'Ferney Rojas',
            password:  bcryptjs.hashSync('123456'),
            role: 'admin'
        },
        {
            email: 'suaza.andre@gmail.com',
            name: 'Andre Suaza',
            password:  bcryptjs.hashSync('mag00scuro'),
            role: 'admin'
        },
    ],
    categories: [
        { "name": "Papel" },
        { "name": "Impresión" },
        { "name": "Colaminado" },
        { "name": "Corte" },
        { "name": "Compras Tecnología" },
        { "name": "Sueldos" },
        { "name": "Transporte" },
        { "name": "Plastificado" },
        { "name": "Troqueles" },
        { "name": "Otros" }
    ]
}