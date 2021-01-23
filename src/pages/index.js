import React from "react"
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./index.module.css"
import { Formik } from "formik"

// C
import { BookMark } from "../components/BookMark";


const GET_BOOKMARKS = gql`
{
  BookMarks  {
    id
    title
    url
  }
} `
const ADD_BOOKMARK = gql`
mutation addBookMark($title: String!,$url: String!){
  addBookMark(title: $title,url:$url){
        title
        url
    }
}`;
export default function Index() {
  const [addBookMark] = useMutation(ADD_BOOKMARK);
  const { loading, error, data } = useQuery(GET_BOOKMARKS);

  return (
    <div className="container">
      <div className="col-sm-6 m-auto">
        <div className="card border-default my-5" >
          <div className="card-header text-center  text-white bg-success">
            <h5 className="card-title mb-0">Add Bookmark</h5>
          </div>
          <div className="card-body text-primary">
            <Formik
              initialValues={{ title: '', url: '' }}
              validate={values => {
                const errors = {};
                if (!values.title) {
                  errors.title = ' Title is required';
                } if (!values.url) {
                  errors.url = 'URL is required';
                }
                return errors;
              }}
              onSubmit={(values, { resetForm }) => {
                addBookMark({
                  variables: {
                    title: values.title,
                    url: values.url
                  },
                  refetchQueries: [{ query: GET_BOOKMARKS }]
                })
                resetForm({})
              }
              }
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                /* and other goodies */
              }) => (
                <form noValidate autoComplete="off" onSubmit={handleSubmit} >

                  <div className="form-group">
                    <label className="text-dark" htmlFor="input"> Title</label>
                    <input type="text" id="standard-basic" name="title" className="form-control" onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title} required />
                    {errors.title && touched.title && errors.title}
                  </div>

                  <div className="form-group">
                    <label className="text-dark" htmlFor="url"> Url</label>
                    <input type="text" id="standard-basic" name="url" className="form-control" onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.url} />
                    {errors.url && touched.url && errors.url}
                  </div>

                  <div className="form-group text-right mb-0">
                    <button type="submit" className="btn btn-success">Submit</button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <h2 className="text-center w-100"> Bookmark List</h2>
        {error ? (
          <div>
            <h1>Error</h1>
          </div>
        ) : loading ? (
          <div>
            <h2>Loading ...</h2>
          </div>
        ) : data.BookMarks.length >= 1 ? (
          data.BookMarks.map(d => {
            return (
              <div className={style.bmcontainer}>
                <BookMark id={d.id} title={d.title} url={d.url} />
              </div>
            )
          })
        ) : (
                <div className="no-task">
                  <h4>No Book Marks</h4>
                </div>
              )
        }
      </div>
    </div>

  )
}

