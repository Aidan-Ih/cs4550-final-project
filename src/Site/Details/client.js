import axios from "axios";
//export const BASE_API = "http://localhost:4000";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const COMMENTS_API = `${BASE_API}/api/events`;

export const deleteComment = async (commentId) => {
    const response = await axios
        .delete(`${COMMENTS_API}/${commentId}`);
    return response.data;
};
export const findCommentsForEvent = async (eventId) => {
    const response = await axios
        .get(`${COMMENTS_API}/${eventId}/comments`);
    return response.data;
};
export const createComment = async (eventId, comment) => {
    const response = await axios.post(
        `${COMMENTS_API}/${eventId}/comments`,
        comment
    );
    return response.data;
};
export const updateComment = async (comment) => {
    const response = await axios.put(`${COMMENTS_API}/${comment._id}`, comment);
    return response.data;
};
