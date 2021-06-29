const button = document.querySelector('button')
const text = document.querySelector('.text')

const recognition = createRecognition()
let listening = false

button.addEventListener('click', e => {
  if (!recognition) return

  listening ? recognition.stop() : recognition.start()

  button.innerHTML = listening ? 'Aperta para falar' : 'Parar de escutar'

  button.classList.toggle('bg-purple-200')
  button.classList.toggle('text-red-500')
})

function createRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null

  if (!recognition) {
    text.innerHTML = "Speech Recognition is not found"
    return recognition
  }

  recognition.lang = "en"

  recognition.onstart = () => listening = true
  recognition.onend = () => listening = false
  recognition.onerror = e => console.log('error', e)
  recognition.onresult = e => text.innerHTML = e.results[0][0].transcript

  return recognition
}