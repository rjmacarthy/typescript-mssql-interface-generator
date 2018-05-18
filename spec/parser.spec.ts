import { parseAll } from '../parser/parse';

describe("Interface parser", function () {
    it('Can parse all models', ()=>{
        parseAll();
    })
});