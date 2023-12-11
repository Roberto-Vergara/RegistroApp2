import { browser,element,by } from "protractor";

describe("pra prueba",()=>{

    beforeEach(()=>{
        browser.get("/")
    })

    it("titulo duoc",()=>{
        expect(element(by.className("h1Title")).getText()).toContain("Asistencia DUOC")
    })

})