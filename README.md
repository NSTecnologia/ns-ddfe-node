# ns-ddfe-node

Esta biblioteca possibilita a comunicação e o consumo da solução API para DDFe da NS Tecnologia.

Para implementar esta biblioteca em seu projeto, você pode:

1. Realizar a instalação do [pacote](https://www.npmjs.com/package/ns-ddfe-node) através do npm:

       npm install ns-ddfe-node

2. Realizar o download da biblioteca pelo [GitHub](https://github.com/NSTecnologia/ns-ddfe-node/archive/refs/heads/main.zip) e adicionar a pasta "ns-modules" em seu projeto.

# Exemplos de uso do pacote

Para que a comunicação com a API possa ser feita, é necessário informar o seu Token no cabeçalho das requisições. 

Para isso, crie um arquivo chamado `configParceiro.js`, e nele adicione:

       const token = ""
       const CNPJ = ""

       module.exports = {token, CNPJ}
       
Dessa forma, o pacote conseguirá importar as suas configurações, onde você estará informando o token da software house e o cnpj do emitente.

## Download Único

Para realizarmos download único na API de DDF-e, devemos gerar o objeto do corpo da requisição e depois, fazer a chamada do método. Veja um exemplo:

Primeiramente, vamos fazer referencia da classe *downloadUnic*, para utilizarmos o método **downloadUnic**

       const downloadUnic = require('./node_modules/ns-ddfe-node/ns_modules/ddfe_module/ddfe_API/downloadUnic')
         
Apos isso, vamo utilizar o método **sendPostRequest** da classe *downloadUnic* para realizar para enviar a requisição de download único para a nossa API.
Este método realiza o enviao da requisição, utilizando o body construtor da classe **downloadUnic**.

       let corpo = new downloadUnic.Body(
		"23220111836676000136550050000000011298085155",
		"07364617000135"
	)

	downloadUnic.sendPostRequest(corpo,"./docs/ddfeUnic").then(getResponse => { console.log(getResponse) })

Os parâmetros deste método são:

+ *23220111836676000136550050000000011298085155* = Chave do documento para ser feito o download, pode ser NFe ou CTe;
+ *07364617000135* = CNPJ do interessado do documento;

O retorno deste método é um objeto json contendo um compilado dos retornos dos métodos realizados pelo download único:

        Response {
		status: 200,
		listaDocs: false,
		nsu: 2373,
		chave: '23220111836676000136550050000000011298085155',
		emitCnpj: '11836676000136',
		emitRazao: 'NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL',
		cSitNFe: 0,
		modelo: 55,
		vNF: 3,
		tpEvento: undefined,
		xml: '<nfeProc versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><NFe xmlns="http://www.portalfiscal.inf.br/nfe"><infNFe versao="4.00",
         }
       }
    
## Download em Lote

Para realizarmos o download em lote na API de DDFe, devemos gerar o objeto do corpo da requisição e depois, fazer a chamada do método. Veja um exemplo:
       
       const downloadLot = require('ns-ddfe-node/ns_modules/ddfe_module/ddfe_API/downloadLote')

		let corpo = new downloadLot.Body(
		"07364617000135",
		2373,
		"false"
	)

	downloadLot.sendPostRequest(corpo,"./docs/ddfeLot").then(getResponse => { console.log(getResponse) })
        
Os parâmetros informados no método são:

+ *07364617000135* =  CNPJ do interessado do documento;
+ "2373" = NSU Número Sequencial Único;
+ *false* = incluirPDF, se caso queira que retorne o PDF dos documentos;

O retorno deste método é um objeto json contendo um compilado dos retornos dos métodos realizados pelo download em lote:

		{
      nsu: 2330,
      chave: '33211132148099000160550000000000031654418558',
      emitCnpj: '32148099000160',
      emitRazao: 'NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL',
      dhEmis: '2021-11-09 10:00:00.0',
      cSitNFe: 0,
      modelo: 55,
      vNF: 3,
      xml: '<nfeProc versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><NFe xmlns="http://www.portalfiscal.inf.br/nfe"><infNFe versao="4.00"
	  },
    {
      nsu: 2331,
      chave: '33211132148099000160550000000000041230388810',
      emitCnpj: '32148099000160',
      emitRazao: 'NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL',
      dhEmis: '2021-11-09 10:00:00.0',
      cSitNFe: 0,
      modelo: 55,
      vNF: 3,
      xml: '<nfeProc versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe"><NFe xmlns="http://www.portalfiscal.inf.br/nfe"><infNFe versao="4.00";
	}
       }	

## Manifestação de Documentos

Para fazermos a manimestação de uma NFe, devemos gerar o objeto do corpo da requisição, utilizando a classe *manifestDoc.Body* e *manifestDoc.manifestacao*, e utilizar o método *manifestDoc.sendPostRequest*, da seguinte forma:

	const inutilizarNFCe = require('./node_modules/ns-nfce-node/ns_nodules/nfce_module/eventos/inutilizacao') 

	let manifestacao = new manifestDoc.manifestacao(
    "210200"
	)

	let corpo = new manifestDoc.Body(
    "07364617000135",
    "35211001012826000133550010000430181100429746",
    manifestacao
	)

	manifestDoc.sendPostRequest(corpo,"./docs/ddfe").then(getResponse => { console.log(getResponse) })
        
Os parâmetros informados no método são:

+ *210200* =  Código do evento que será realizado na NF-e: 210200 – Confirmação da Operação, 210210 – Ciência da Operação, 210220 – Desconhecimento da Operação, 210240 – Operação não Realizada ;
+ *07364617000135* = CNPJ do interessado do documento;
+ *35211001012826000133550010000430181100429746* = Chave da NF-e que será feito o evento de manifestação;

## Desacordo de CT-e

Para fazermos o desacordo de um CT-e, devemos gerar o objeto do corpo da requisição, utilizando a classe *desacordo.InfEvento* e *desacordo.Body*, e utilizar o método *desacordo.sendPostRequest*, da seguinte forma:

	const desacordo = require('ns-ddfe-node/ns_modules/ddfe_module/ddfe_API/desacordoOperacaoCTe')
	
	let infEvento = new desacordo.InfEvento(
    "43220107364617000135570000000161281000003300",
    2,
    "2022-01-10T15:31:00-03:00",
    "Evento de desacordo gerado para teste",
    "1",
	)

	let corpo = new desacordo.Body(
    "07364617000135",
    infEvento
	)

	desacordo.sendPostRequest(corpo,"./docs/ddfe").then(getResponse => { console.log(getResponse) })
	
	Os parâmetros informados no método são:

+ *210200* =  Código do evento que será realizado na NF-e: 210200 – Confirmação da Operação, 210210 – Ciência da Operação, 210220 – Desconhecimento da Operação, 210240 – Operação não Realizada ;
+ *2* = Tipo de ambiente tpAmb 1 = produção ou 2 =homologação;
+ *"2022-01-10T15:31:00-03:00"* = Data e hora que está sendo feito o evento de desacordo;
+ *"Evento de desacordo gerado para teste"* = xMotivo pelo qual está sendo feito o desacordo;
+ *07364617000135* = CNPJ do interessado do documento;
+ *43220107364617000135570000000161281000003300* = Chave da NF-e que será feito o evento de manifestação;

### Informações Adicionais

Para saber mais sobre o projeto DDFe API da NS Tecnologia, consulte a [documentação](https://docsnstecnologia.wpcomstaging.com/docs/ns-ddfe/)


