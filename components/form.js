import Link from 'next/link'

const Form = ({ isLogin, errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Password</span>
      <input type="password" name="password" required />
    </label>

    <div className="submit">
      <button type="submit">Login</button>
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}

    <style jsx>{`
      form {
        display: flex;
        flex-flow: column;
        height: 100vh;
        justify-content: center;
        align-items: center;
      }
      label {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
      }
      label > span {
        font-weight: 400;
        font-size: 1.5em;
        margin-bottom: 1em;
        text-align: center;
      }
      input {
        outline: none;
        border: 1px solid green;
        font-size: 1.5em;
        background: white;
        color: green;
        padding: 0.5em 1em;
        border-radius: 1em;
        cursor: pointer;
        box-shadow: 0px 9px 80px rgba(51, 0, 75, 0.07), 0px 4.65569px 25.3798px rgba(51, 0, 75, 0.0687841), 0px 3.24309px 12.1842px rgba(51, 0, 75, 0.065015), 0px 2.07084px 5.18613px rgba(51, 0, 75, 0.05513);
      }
      .submit {
        display: flex;
        align-items: center;
      }
      .submit > a {
        text-decoration: none;
      }
      .submit > button {
        margin: 1em auto;
        outline: none;
        border: 1px solid green;
        font-size: 1.5em;
        background: white;
        color: green;
        padding: 0.5em 1em;
        border-radius: 1em;
        cursor: pointer;
        box-shadow: 0px 9px 80px rgba(51, 0, 75, 0.07), 0px 4.65569px 25.3798px rgba(51, 0, 75, 0.0687841), 0px 3.24309px 12.1842px rgba(51, 0, 75, 0.065015), 0px 2.07084px 5.18613px rgba(51, 0, 75, 0.05513);
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
    `}</style>
  </form>
)

export default Form
