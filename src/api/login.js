import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'http://127.0.0.1:9081/manager/v1.0/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function isBind(params) {
  return request({
    url: 'http://127.0.0.1:9081/manager/v1.0/binding',
    method: 'get',
    params
  })
}

export function binding(username, password) {
  return request({
    url: 'http://127.0.0.1:9081/manager/v1.0/binding',
    method: 'post',
    data: {
      username,
      password
    },
    timeout: 120000
  })
}
