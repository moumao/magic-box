import axios from 'axios';

const request = axios.create({
                    headers: {
                        withCredentials: true
                    },
                    timeout: 2000
                });

export default request;
