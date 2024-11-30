const startGameButton = document.querySelector('.start-game')
const title = document.querySelector('h1')
const questionContainer = document.querySelector('.question-container')
const questionText = document.querySelector('.question')
const answersContainer = document.querySelector('.answers-container')
const nextQuestionButton = document.querySelector('.next-question')

startGameButton.addEventListener('click', startGame)
nextQuestionButton.addEventListener('click', displayNextQuestion)

let currentQuestionIndex = 0 // contador das questões
let totalCorrect = 0

function startGame() {
    startGameButton.classList.add('hide')
    questionContainer.classList.remove('hide')
    title.classList.add('hide')
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if (questions_page_2.length === currentQuestionIndex) {
        return finishGame()
    }

    questionText.textContent = questions_page_2[currentQuestionIndex].question
    questions_page_2[currentQuestionIndex].answer.forEach(answer => {
        const newAnswer = document.createElement('button')

        newAnswer.classList.add('button', 'answer')
        newAnswer.textContent = answer.text

        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }

        answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener('click', selectAnswer)
    })
}

function resetState() {
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild)
    }

    document.body.removeAttribute('class')
    nextQuestionButton.classList.add('hide')
}

function selectAnswer(event) {
    const answerClicked = event.target

    if (answerClicked.dataset.correct) {
        document.body.classList.add('correct')
        document.body.classList.remove('incorrect')
        totalCorrect++
    } else {
        document.body.classList.add('incorrect')
        document.body.classList.remove('correct')
    }

    document.querySelectorAll('.answer').forEach(button => {
        if (button.dataset.correct) {
            button.classList.add('correct')
        } else {
            button.classList.add('incorrect')
        }
        button.disabled = true
    })

    nextQuestionButton.classList.remove('hide')
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions_page_2.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)

    let message = ''

    switch (true) {
        case (performance >= 90):
            message = 'Execelente :D'
            break
        case (performance >= 70):
            message = 'Muito Bom :)'
            break
        case (performance >= 50):
            message = 'Bom :|'
            break
        case (performance >= 30):
            message = 'Precisa Melhorar :('
            break
        default:
            message = 'Precisa Melhorar MUITO D:'
    }

    questionContainer.innerHTML =
        `
            <p class="final-message">
                Você acertou ${totalCorrect} de ${totalQuestion} questôes!
                <span>Resultado: ${message}</span>
            </p>
        
            <button onclick="window.location.reload()" class="button">Refazer teste</button>

        `
}

const questions_page_2 = [
    {
        question: 'Como cumprir a promessa no requisito FAZER BEM?',
        answer: [
            { text: 'Atender rapidamente sem verificar os pedidos detalhadamente, pois a agilidade é mais importante que os condimentos', correct: false },
            { text: 'Nunca prestar atenção aos pedidos personalizados; todos os pedidos devem ser tratados da mesma forma', correct: false },
            { text: 'Entregar os pedidos exatamente como estão na tela, mesmo que algo pareça errado', correct: false },
            { text: 'Leia atentamente a tela de pedidos, Lembre-se de todos os condimentos, Verifique o pedido antes de entregá-lo ao cliente, Preste atenção aos pedidos personalizados, Se algo não estiver certo, não sirva', correct: true },
        ]
    },
    {
        question: 'Como cumprir a promessa no requisito FAZER ESPECIAL?',
        answer: [
            { text: 'Montar os pedidos rapidamente, sem se preocupar com detalhes ou personalizações', correct: false },
            { text: 'Ignorar os clientes habituais, pois o foco deve ser nos novos clientes', correct: false },
            { text: 'Evitar interagir com o cliente para não atrasar o atendimento', correct: false },
            { text: 'Monte cada pedido com cuidado, personalize cada interação, preste atenção no cliente. O que ele precisa? Guie o cliente ao longo da experiência, cumprimente os clientes habituais pelo nome, ofereça para levar uma bandeja', correct: true },
        ]
    },
    {
        question: 'Como deve estar a área de entrada do restaurante?',
        answer: [
            { text: 'A área de entrada é normalmente cheia de janelas que devem estar brilhando para garantir ótimas primeiras impressões aos nossos clientes', correct: true },
            { text: 'As janelas podem estar parcialmente limpas, desde que não estejam completamente sujas', correct: false },
            { text: 'A área de entrada deve conter vários objetos decorativos para chamar atenção, mesmo que obstruam a visão', correct: false },
            { text: 'Não é necessário verificar a área com frequência, pois os clientes não reparam nesses detalhes', correct: false },
        ]
    },
    {
        question: 'Como deve estar a área de fritadeiras para garantir a segurança de todos?',
        answer: [
            { text: 'Não é necessário limpar a área regularmente; apenas organize os resíduos visíveis', correct: false },
            { text: 'Mantenha a área com objetos próximos às fritadeiras para facilitar o acesso rápido', correct: false },
            { text: 'A área deve estar limpa, livre de resíduos, organizada e segura', correct: true },
            { text: 'A organização da área não influencia a segurança, desde que o óleo esteja na temperatura correta', correct: false },
        ]
    },
    {
        question: 'Como deve estar configurada a tela de pedidos do iniciador?',
        answer: [
            { text: '3x3', correct: false },
            { text: '5x2', correct: false },
            { text: '4x2', correct: true },
            { text: '4x3', correct: false },
        ]
    },
    {
        question: 'Como devem ser os Padrões de aparência dos sanduíches?',
        answer: [
            { text: 'Não é necessário que os sanduíches pareçam com as fotos, pois o sabor é mais importante', correct: false },
            { text: 'Ingredientes podem ser colocados de maneira aleatória, contanto que estejam frescos', correct: false },
            { text: 'A aparência dos alimentos não influencia a experiência do cliente', correct: false },
            { text: 'A nossa comida deve parecer “como as fotos”. Mesmo que todos os ingredientes estejam quentes, frescos e saborosos, precisamos preparar cuidadosamente cada alimento', correct: true },
        ]
    },
    {
        question: 'Como devem ser Padrões de sabor dos sanduíches?',
        answer: [
            { text: 'Ingredientes podem ser misturados de forma improvisada, desde que estejam quentes', correct: false },
            { text: 'Os nossos produtos são feitos utilizando vários ingredientes cuidadosamente selecionados para garantir que os sabores se complementem', correct: true },
            { text: 'O sabor individual dos ingredientes é mais importante do que a combinação deles', correct: false },
            { text: 'Usar os ingredientes disponíveis, mesmo que não se complementem', correct: false },
        ]
    },
    {
        question: 'Como devem ser Padrões de temperatura dos sanduíches?',
        answer: [
            { text: 'Nossa comida deve ser servida quente, saborosa e com a percepção de frescor - feita na hora', correct: true },
            { text: 'Servir os sanduíches à temperatura ambiente para evitar reclamações de queimaduras', correct: false },
            { text: 'Manter os alimentos em temperatura baixa, pois isso evita que estraguem rapidamente', correct: false },
            { text: 'Não é necessário garantir frescor, contanto que estejam dentro da validade', correct: false },
        ]
    },
    {
        question: 'Como devemos anotar o pedido do cliente?',
        answer: [
            { text: 'Fazer anotações rápidas, sem ouvir completamente o cliente, para economizar tempo', correct: false },
            { text: 'Adicionar os itens que parecem mais comuns, mesmo que o cliente não os peça', correct: false },
            { text: 'Registrar o pedido no sistema apenas após o cliente sair', correct: false },
            { text: 'Ouça o que o cliente está pedindo e permita que ele defina o ritmo da interação. À medida que realizam o pedido, digite no sistema', correct: true },
        ]
    },
    {
        question: 'Como devemos anotar os pedidos feitos por aplicativo?',
        answer: [
            { text: 'Pedir que o cliente descreva os itens manualmente em vez de usar o código de quatro dígitos', correct: false },
            { text: 'Buscar o pedido manualmente na lista, sem utilizar a tecla LOCALIZAR', correct: false },
            { text: 'Peça que o cliente mostre o código de quatro dígitos e use a tecla LOCALIZAR pedido de aplicativo para encontrar o pedido no sistema', correct: true },
            { text: 'Não conferir o pedido com o cliente, pois o aplicativo já o registrou', correct: false },
        ]
    },
    {
        question: 'Como devemos manter a segurança da estação de McFritas com relação ao óleo quente?',
        answer: [
            { text: 'Tome cuidado perto do óleo quente, e coloque os cestos quentes no seu lugar apropriado', correct: true },
            { text: 'Mover os cestos quentes com as mãos desprotegidas para evitar perda de tempo', correct: false },
            { text: 'Deixar os cestos em qualquer lugar próximo, desde que não estejam em uso', correct: false },
            { text: 'Limitar o cuidado com o óleo apenas ao período de limpeza', correct: false },
        ]
    },
    {
        question: 'Como devemos nos certificar que estamos prontos para realizar um atendimento aos clientes?',
        answer: [
            { text: 'Começar a atender sem verificar se a área está estocada e organizada', correct: false },
            { text: 'Verificar se a área de atendimento está organizada, estocada e pronta e se todos os equipamentos estão operando corretamente', correct: true },
            { text: 'Focar apenas no cliente, deixando a organização da área para outro momento', correct: false },
            { text: 'Trabalhar mesmo com equipamentos que não estão funcionando corretamente', correct: false },
        ]
    },
    {
        question: 'Como devemos realizar a limpeza dos cestos de fritura?',
        answer: [
            { text: 'Lavar os cestos apenas no final do expediente, independentemente do uso', correct: false },
            { text: 'Limpar apenas com água corrente, sem a necessidade de higienização completa', correct: false },
            { text: 'Deixar os cestos secando na área de fritura em vez de higienizá-los na pia', correct: false },
            { text: 'Devemos levar todos os cestos e a peneira para a pia do backroom. Todos os utensílios devem ser lavados, enxaguados e higienizados a cada 4 horas', correct: true },
        ]
    },
    {
        question: 'Como identificamos o Padrão Ouro das Bebidas?',
        answer: [
            { text: 'Aparência, temperatura adequada ao tipo de produto (quentes ou frias), textura e sabor característico ao produto', correct: true },
            { text: 'Apenas pela temperatura, pois aparência e sabor não são relevantes', correct: false },
            { text: 'Não se preocupar com textura, contanto que a bebida esteja servida corretamente', correct: false },
            { text: 'Garantir que as bebidas tenham uma aparência consistente, mesmo que o sabor varie', correct: false },
        ]
    },
    {
        question: 'Como manter os contaminantes longe dos alimentos?',
        answer: [
            { text: 'É permitido usar ingredientes que caíram no chão, desde que pareçam limpos', correct: false },
            { text: 'Não é necessário seguir a política de higiene se os alimentos parecem em boas condições', correct: false },
            { text: 'Siga a política de higiene e uniforme. Se algo cair no nosso alimento, ou os ingredientes caírem no chão, jogue-os fora', correct: true },
            { text: 'Contaminantes não afetam diretamente a experiência do cliente se forem mínimos', correct: false },
        ]
    },
]