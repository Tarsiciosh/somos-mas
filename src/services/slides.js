import {
  deleteOngApi,
  getOngApi,
  postOngApi,
  putOngApi,
} from "./publicApiService";
import { SLIDES } from "./apiRest";


export const createSlide = async (values) => {
  return postOngApi(SLIDES, values);
};

export const getSlides = () => {
  return getOngApi(SLIDES);
};

export const deleteSlide = (id) => {
  return deleteOngApi(SLIDES, id);
};

export const updateSlide = (id, values) => {
  return putOngApi(SLIDES, id, values);
};
