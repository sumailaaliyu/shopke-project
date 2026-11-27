import './ui.css'

// Pass an `id` so the label is connected to the input.
// `inputRef` lets a page focus the field with useRef.
function Input({ label, id, error, multiline = false, inputRef, ...props }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {multiline ? (
        <textarea id={id} ref={inputRef} rows="4" {...props} />
      ) : (
        <input id={id} ref={inputRef} {...props} />
      )}
      {error && <small className="field-error">{error}</small>}
    </div>
  )
}

export default Input