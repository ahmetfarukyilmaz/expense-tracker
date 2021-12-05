import { RecordDispatch, Record, RecordForm } from "../../types/record";
import api from "../../utils/api";

export const getRecords = () => async (dispatch: RecordDispatch) => {
    dispatch({ type: "GET_RECORDS_START" });
    try {
        const res = await api.get<Record[]>("/records");
        // sort the records by id in descending order (newest first) to display the newest record first in the list
        res.data.sort((a, b) => b.id - a.id);
        dispatch({ type: "GET_RECORDS_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "GET_RECORDS_ERROR", payload: err });
    }
};

export const addRecord =
    (form: RecordForm) => async (dispatch: RecordDispatch) => {
        dispatch({ type: "ADD_RECORD_START" });
        try {
            const res = await api.post<Record>("/records", form);
            dispatch({ type: "ADD_RECORD_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "ADD_RECORD_ERROR", payload: err });
        }
    };

export const updateRecord =
    (id: number, form: Partial<RecordForm>) =>
    async (dispatch: RecordDispatch) => {
        dispatch({ type: "UPDATE_RECORD_START" });
        try {
            const res = await api.put<Record>(`/records/${id}`, form);
            dispatch({ type: "UPDATE_RECORD_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_RECORD_ERROR", payload: err });
        }
    };

export const deleteRecord =
    (id: number) => async (dispatch: RecordDispatch) => {
        dispatch({ type: "DELETE_RECORD_START" });
        try {
            await api.delete(`/records/${id}`);
            dispatch({ type: "DELETE_RECORD_SUCCESS", payload: id });
        } catch (err) {
            dispatch({ type: "DELETE_RECORD_ERROR", payload: err });
        }
    };
