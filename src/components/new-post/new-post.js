import * as React from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { postPost } from '../../operations/posts'
import validate from './validate'
import Button from 'jane-components/lib/button'

const Error = styled.div`
  padding: 15px;
  background-color: red;
  border: 1px solid darkred;
  color: #e5e5e5;
`

const TextArea = styled.textarea`
  width: 400px;
  height: 200px;
`

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
  & > *:not(:last-child) {
    margin-bottom: 8px;
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
          (!dirtySinceLastSubmit && submitFailed && (
            <Error type="error">{submitError}</Error>
          ))}
        <h1>New Post</h1>
        <Field
          autoComplete="off"
          component="input"
          name="title"
          placeholder="Title"
        />
        <Field
          autoComplete="off"
          component={TextArea}
          name="text"
          placeholder="Text"
          multiline
        />
        <Button type="primary">Submit</Button>
      </FormWrapper>
    )}
  />
)

export default NewPost
