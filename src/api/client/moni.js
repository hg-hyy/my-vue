import request from '@/utils/request'
import { getIP } from '@/utils/auth'

export function getDashboard(params) {
  return request({
    url: 'http://' + getIP() + ':8910/n_node/v1.0/sensor/seq',
    method: 'get',
    params
  })
}

export function getMoniProcess(params) {
  return request({
    url: 'http://127.0.0.1:9081/manager/v1.0/process',
    method: 'get',
    params
  })
}
