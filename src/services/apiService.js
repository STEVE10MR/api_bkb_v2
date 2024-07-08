import axios from 'axios';
import FormData from 'form-data';
import appError from '../utils/appError.js';

const axiosInstance = axios.create({
  timeout: 5000,
});

const callApi = async (typeConsult, formData) => {
  try {
    const result = await axiosInstance.post(
      `${process.env.ARTEMIS_API}/${typeConsult}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return result;
  } catch (err) {
    throw new appError('ERROR_MESSAGE');
  }
};

export const consultFace = async (image) => {
  try {
    const formData = new FormData();
    formData.append('imagen', image);
    const result = await callApi('detectFace', formData);
    if (!result) throw new appError('ERROR_CONSULT_UNDEFINED', 400);
    return result;
  } catch (err) {
    throw new appError('ERROR_MESSAGE');
  }
};
export const addFace = async (code, image) => {
  try {
    const formData = new FormData();
    formData.append('name', code);
    formData.append('imagen', image);
    const result = await callApi('addFace', formData);
    if (!result) throw new appError('ERROR_ADD_FACE_UNDEFINED', 400);
    return result;
  } catch (err) {
    throw new appError('ERROR_MESSAGE');
  }
};

export const classifyFace = async (image) => {
  try {
    const formData = new FormData();
    formData.append('imagen', image);
    const result = await callApi('consult', formData);
    if (!result) throw new appError('ERROR_CLASSIFY_UNDEFINED', 400);
    return result;
  } catch (err) {
    throw new appError('ERROR_MESSAGE');
  }
};
