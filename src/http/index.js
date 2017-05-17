import axios from 'axios';
import axiosConfig from './axiosConfig';
export default new http().create();

function http() {
  console.log('http create.');
  var http=axios.create(axiosConfig);
  this.create=function () {
    return http;
  }
}
