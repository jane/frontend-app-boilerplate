import React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { postPost } from '../../operations/posts'
import validate from './validate'

const Button = styled.button`
  border: 1px solid rebeccapurple;
  font-weight: 500;
  margin: 8px;
  padding: 8px;
  text-align: center;
`

const Error = styled.div`
  padding: 15px;
  background-color: red;
  border: 1px solid darkred;
  color: #e5e5e5;
`

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 30px;
  & > *:not(:last-child) {
    margin-bottom: 5px;
  }
`

const onNewPost = ({ title, text }, form) =>
  postPost({
    title,
    text,
  })
    .then(() => form.reset())
    .catch(() => ({ [FORM_ERROR]: 'Error Submitting' }))

const NewPost = () => (
  <Form
    onSubmit={onNewPost}
    validate={validate}
    render={({
      dirtySinceLastSubmit,
      handleSubmit,
      submitError,
      submitFailed,
    }) => (
      <FormWrapper onSubmit={handleSubmit}>
        {submitError &&
          (!dirtySinceLastSubmit &&
            submitFailed && <Error type="error">{submitError}</Error>)}
        <Field
          autoComplete="off"
          component="input"
          name="title"
          placeholder="Title"
        />
        <Field
          autoComplete="off"
          component="textarea"
          name="text"
          placeholder="Text"
          multiline
        />
        <Button>
          Submit
        </Button>
      </FormWrapper>
    )}
  />
)

export default NewPost