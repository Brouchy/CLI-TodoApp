import { menuInquirer,pausa } from "./helpers/inquirer.js";

console.clear();

(async()=>{
    await main();
})();

async function main() {
    let opt:string;
    do{
        opt= await menuInquirer();
        console.log({opt});
        await pausa();
    }while(opt!=='0');
}
