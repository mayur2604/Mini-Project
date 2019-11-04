import { combineReducers } from 'redux'
import modifyTable from './modifyTable'
import modifyItem from './modifyItem'

export default combineReducers({
    modifyTable,
    modifyItem
});
