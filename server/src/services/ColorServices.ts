import { prisma } from "../lib/prisma";

export default class ColorServices{
    static async getAllColors(){
        return await prisma.color.findMany();
    }
}