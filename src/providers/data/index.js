import simpleRestProvider from 'ra-data-simple-rest'
import { BACKEND_URL } from '../../configs';

const dataProvider = simpleRestProvider(BACKEND_URL);
export default dataProvider