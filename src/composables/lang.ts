import { useCookies } from '@vueuse/integrations/useCookies'

let cookies = useCookies()
let LangKey = 'lang'

// 设置token
export function setLang(lang: string) {
  return cookies.set(LangKey, lang)
}

// 获取token
export function getLang() {
  return cookies.get(LangKey)
}

// 移除token
export function removeLang() {
  return cookies.remove(LangKey)
}
