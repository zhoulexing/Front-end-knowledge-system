import request from '../utils/request';

export function getTblList() {
  return request('/api/example/getTblList');
}
