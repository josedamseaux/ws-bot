const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['siguiente', 'bien']).addAnswer([''])

const flow2 = addKeyword(['2', 'atender', 'cliente']).addAnswer(
    [
        '🙌 En breve te atenderemos',
    ],
    null,
    null,
    [flowSecundario]
)

const flow1 = addKeyword(['menu', '1']).addAnswer(
    [
        '📄 Aquí está nuestro menú',
        'https://lapicota.netlify.app/assets/menujpg.png',
    ],
    null,
    null,
    [flow2, flowSecundario]
)



const flowGracias = addKeyword(['gracias', 'grac', 'grax']).addAnswer(
    [
        '¿Algo más en lo que podamos servirte?',

        // '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario, flow1]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'Hola', 'Ola','buenas', 'buen dia'])
    .addAnswer('Gracias por comunicarte con La Picota 1')
    .addAnswer(
        [
            'Envía *1* para ver nuestra carta',
            'Envía *2* para atenderte',
            '🕑Estamos abiertos de lunes a viernes de 7am a 11pm. Sábados hasta las 4pm',
            '🖼️Domingos descansamos',

        ],
        null,
        null,
        [flow1, flow2 ,flowGracias]
    )

const main = async () => {
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)
    const adapterDB = new MockAdapter()

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
