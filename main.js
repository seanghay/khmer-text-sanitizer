import './style.css'
import './pico.min.css'
import { tokenize, isInvalidKhmerGrapheme } from 'khmertokenizer';

const $input = document.querySelector("#input")
const $result = document.querySelector("#result")

$input.addEventListener('input', e => {
  $result.value = sanitize(e.target.value)
})

function sync(a, b) {
  a.addEventListener('scroll', (e) => {
    const p = e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)
    b.scrollTop = p * (b.scrollHeight - b.clientHeight)
  })
}

sync($input, $result)
sync($result, $input)

function sanitize(t) {
  if (!t) return t;
  t = tokenize(t)
    .filter(c => !isInvalidKhmerGrapheme(c)) // remove invalid graphemes
    .join("")
  const r = /([\u200b\u1780-\u17ff]+)[…\/\.\_\-\,]+([\u200b\u1780-\u17ff]+)([…\/\.\_\-\,]+)?/gm
  return t.replace(r, '$1$2').replace(/\u200b\u200b+/gm, '\u200b')
}