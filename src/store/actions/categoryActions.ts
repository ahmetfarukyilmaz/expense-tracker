import { Category, CategoryDispatch, CategoryForm } from "../../types/category";
import api from "../../utils/api";

export const getCategories = () => async (dispatch: CategoryDispatch) => {
    dispatch({ type: "GET_CATEGORIES_START" });
    try {
        const response = await api.get<Category[]>("/categories");
        dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "GET_CATEGORIES_ERROR" });
    }
};

export const addCategory =
    (form: CategoryForm) => async (dispatch: CategoryDispatch) => {
        dispatch({ type: "ADD_CATEGORY_START" });
        try {
            const response = await api.post<Category>("/categories", form);
            dispatch({ type: "ADD_CATEGORY_SUCCESS", payload: response.data });
        } catch (error) {
            dispatch({ type: "ADD_CATEGORY_ERROR" });
        }
    };

export const updateCategory =
    (id: number, form: Partial<CategoryForm>) =>
    async (dispatch: CategoryDispatch) => {
        dispatch({ type: "UPDATE_CATEGORY_START" });
        try {
            const response = await api.put<Category>(`/categories/${id}`, form);
            dispatch({
                type: "UPDATE_CATEGORY_SUCCESS",
                payload: response.data,
            });
        } catch (error) {
            dispatch({ type: "UPDATE_CATEGORY_ERROR" });
        }
    };

export const deleteCategory =
    (id: number) => async (dispatch: CategoryDispatch) => {
        dispatch({ type: "DELETE_CATEGORY_START" });
        try {
            await api.delete(`/categories/${id}`);
            dispatch({ type: "DELETE_CATEGORY_SUCCESS", payload: id });
        } catch (error) {
            dispatch({ type: "DELETE_CATEGORY_ERROR" });
        }
    };
