const TokenKey = 'Admin-Token'
const MsgKey = 'Admin-Msg'
const UserKey = 'Admin-User'
const IPKey = 'Admin-IP'

export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.sessionStorage.removeItem(TokenKey)
}

export function getUser() {
  return window.sessionStorage.getItem(UserKey)
}

export function setUser(user) {
  return window.sessionStorage.setItem(UserKey, user)
}

export function removeUser() {
  return window.sessionStorage.removeItem(UserKey)
}

export function getMsgId() {
  return window.sessionStorage.getItem(MsgKey)
}

export function setMsgId(msgid) {
  return window.sessionStorage.setItem(MsgKey, msgid)
}

export function removeMsgId() {
  return window.sessionStorage.removeItem(MsgKey)
}

export function getIP() {
  return window.sessionStorage.getItem(IPKey)
}

export function setIP(ipaddress) {
  return window.sessionStorage.setItem(IPKey, ipaddress)
}

export function removeIP() {
  return window.sessionStorage.removeItem(IPKey)
}
