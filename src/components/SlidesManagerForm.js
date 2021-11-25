import React, {useState, useEffect} from "react";
import {useFormik} from "formik";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {toBase64} from "../helpers/toBase64";
import {SLIDES} from "../services/apiRest";
import axios from "axios";

export default function SlidesManagerForm({slide = null}) {
  const [editionMode, setEditionMode] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  const ckeditorHandler = (event, editor) => {
    formik.setFieldValue("description", editor.getData());
  };

  const createSlide = async (values) => {
    try {
      const response = await axios.post(
        SLIDES,
        values
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const updateSlide = async (values) => {
    try {
      const response = await axios.put(
        `${SLIDES}/${slide.id}`,
        values
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (values) => {
    const errors = {};
    /* Name */
    if (!values.name) {
      errors.name = "Campo obligatorio";
    } else if (values.name.length < 4) {
      errors.name = "El nombre debe tener como mínimo 4 caracteres";
    }
    /* Description */
    if (!values.description) {
      errors.description = "Campo obligatorio";
    }

    /* Order */
    if (!values.order) {
      errors.order = "Campo obligatorio";
    }
    /* Image */
    if (!editionMode && !values.image) {
      errors.image = "Carga una imagen";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues:
      slide !== null
        ? {
          name: slide.name,
          description: slide.description,
          order: slide.order,
        }
        : {
          name: "",
          description: "",
          order: "",
          image: null,
        },
    validate,
    onSubmit: (values) => {
      editionMode ? updateSlide(slide.id, values) : createSlide(values);
    },
  });

  useEffect(() => {
    slide !== null && setEditionMode(true);
  }, [slide]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <label htmlFor="description">Description</label>
        <CKEditor
          editor={ClassicEditor}
          id="description"
          name="description"
          onChange={ckeditorHandler}
          data={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div>{formik.errors.description}</div>
        ) : null}

        <label htmlFor="order">Order</label>
        <input
          id="order"
          name="order"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.order}
        />
        {formik.touched.order && formik.errors.order ? (
          <div>{formik.errors.order}</div>
        ) : null}

        <label htmlFor="image">Imagen</label>
        <input
          name="image"
          id="image"
          type="file"
          accept="image, .jpg, .png"
          onChange={(e) => {
            toBase64(e.target.files[0])
              .then((res) => formik.setFieldValue("image", res))
              .catch((error) => console.log(error));
            setImagePreview(e.target.files[0]);
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.image && formik.errors.image ? (
          <div>{formik.errors.image}</div>
        ) : null}

        <input type="submit" value={editionMode ? "Editar" : "Crear"}/>
      </form>
      {imagePreview ? (
        <img src={URL.createObjectURL(imagePreview)} alt="Imagen del slide"/>
      ) : slide !== null ? (
        <img src={slide.image} alt="Imagen del slide"/>
      ) : (
        <span></span>
      )}
    </>
  );
}
