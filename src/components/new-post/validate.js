export default (values = {}) => {
  const errorText = 'This field is required'
  const errors = {}
  if (!values.title) {
    errors.question = errorText
  }
  if (!values.text) {
    errors.answer = errorText
  }
  return errors
}
