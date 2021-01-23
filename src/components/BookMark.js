import React from 'react'
import style from "./BookMark.module.css"
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
const DELETE_BOOKMARK = gql`
  mutation deleteBookMark($id: ID!){
      deleteBookMark(id: $id){
          id
      }
  }`
const GET_BOOKMARKS = gql`
{
  BookMarks  {
    id
    title
    url
  }
} `
export const BookMark = (prop) => {
  const [deleteBookMark] = useMutation(DELETE_BOOKMARK);
  const handleDelete = (id) => {
    deleteBookMark({
      variables: {
        id
      },
      refetchQueries: [{ query: GET_BOOKMARKS }]
    })
  }
  return (
    <div className={style.content}>
      <div  key={prop.id}>
        <h3><b>Title: </b> {prop.title}</h3>
        <p><b>URL : </b> <a href={`https://${prop.url}`}>{(prop.url)}</a></p>
        <button type="submit" className="btn btn-danger"  onClick={() => handleDelete(prop.id)}>Delete</button>
      </div>
    </div>
  )
}
