import request from '@/utils/request'
import { getIP } from '@/utils/auth'

export function message(params) {
  return request({
    url: 'http://' + getIP() + ':8910/n_node/v1.0/message/dis',
    method: 'post',
    data: params
  })
}
