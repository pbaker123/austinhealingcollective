import axios from "axios";

export default {
  get: path => {
    return axios.get(path);
  },
  post: function(path, data) {
    return axios.post(path, data);
  },
  delete: function(path, id) {
    return axios.delete(path + "/" + id);
  },
  update: function(path, id, update) {
    return axios.put(path + "/" + id, update);
  }
};
