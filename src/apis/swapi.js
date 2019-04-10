import axios from 'axios';

/**
 * Instead of calling axios right away, we create a new "API" instance with a predefined base URL for every swapi call.
 */
export default axios.create({ baseURL: 'https://swapi.co/api' });