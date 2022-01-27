const nsAPI = require('../../api_module/nsAPI')
const util = require("../../api_module/util")

const url = "https://ddfe.ns.eti.br/events/cte/disagree"

class Body {
    constructor(CNPJInteressado, infEvento) {
        this.CNPJInteressado = CNPJInteressado; 
        this.infEvento = infEvento;       

    }
}
class InfEvento{
    constructor( chCTe, tpAmb, dhEvento, xObs, indDesacordoOper ){
    this.chCTe = chCTe;
    this.tpAmb = tpAmb;
    this.dhEvento = dhEvento;
    this.xObs = xObs;
    this.indDesacordoOper = indDesacordoOper;
    }
}

class Response {
    constructor({ status, motivo, erro, retEvento, cStat, xMotivo, dhRegEvento, nProt, xml }) {
       this.status = status;
       this.motivo = motivo;
       this.erro = erro;
       this.retEvento = retEvento;
    }
}

async function sendPostRequest(body, caminho) {

    let responseAPI = new Response(await nsAPI.PostRequest(url, body))

    if (responseAPI.pdf != null) {
        let data = responseAPI.pdf;
        let buff = Buffer.from(data, 'base64');
        util.salvarArquivo(caminho, responseAPI.chave, ".pdf", buff)
    }

    if (responseAPI.xml != null) {
        util.salvarArquivo(caminho, responseAPI.chave, ".xml", responseAPI.xml)
    }

    return responseAPI
}

module.exports = { Body, sendPostRequest,InfEvento }

