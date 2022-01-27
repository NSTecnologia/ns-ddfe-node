const nsAPI = require('ns-ddfe-node/ns_modules/api_module/nsAPI')
const util = require("ns-ddfe-node/ns_modules/api_module/util")

const url = "https://ddfe.ns.eti.br/dfe/unique"

class Body {
    constructor(chave, CNPJInteressado) {
        this.chave = chave;
        this.CNPJInteressado = CNPJInteressado
    }
}

class Response {
    constructor({ status, listaDocs, nsu, chave, emitCnpj, emitRazao, cSitNFe, modelo, vNF, tpEvento, xml, pdf }) {
        this.status = status;
        this.listaDocs = listaDocs;
        this.nsu = nsu;
        this.chave = chave;
        this.emitCnpj = emitCnpj;
        this.emitRazao = emitRazao;
        this.cSitNFe = cSitNFe;
        this.modelo = modelo;
        this.vNF = vNF;
        this.tpEvento = tpEvento;
        this.xml = xml;
        this.pdf = pdf;
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

module.exports = { Body, sendPostRequest }

